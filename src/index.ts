import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.get('/api/v1/students', (_req: Request, res: Response) => {
  res.status(200).json([
    { id: 'carlos.angulo.pizarro', name: 'Carlos Alberto Angulo Pizarro', carrera: 'Ingeniería de Software' }
  ]);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
