import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Only validate the body
      const validatedData = await schema.parseAsync(req.body);

      // Replace the request body with validated data
      req.body = validatedData;

      next();
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          }))
        });
      }

      // Handle other errors
      return res.status(500).json({
        success: false,
        error: 'Validation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
};

// Usage example in routes:
/*
router.post(
  '/text',
  validateRequest(DeckController.createDeckSchema),
  DeckController.createFromText
);
*/