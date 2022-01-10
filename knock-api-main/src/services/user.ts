import { User } from "../models";

export const findUserByEmail = async (email: string, includeDelete: boolean = false): Promise<any> => {
  const where: any = {
    email,
  }
  if (!includeDelete) {
    where.is_deleted = false
  }
  return await User.findOne({
    where,
    include: ['role'],
  });
};
