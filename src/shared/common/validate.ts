import { Model } from 'mongoose';

export async function checkModel(model: Model<any>, id: string) {
  const a = await model.findById(id);
  if (!a) return false;
  else return true;
}
