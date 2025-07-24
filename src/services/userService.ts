// import { UserModel } from '../models/usermodel';

// export const createUser = async (email: string, password: string, username?: string) => {
//   return await UserModel.create({ data: { email, password, username } });
// };

// export const findUserByEmail = async (email: string) => {
//   return await UserModel.findUnique({ where: { email } });
// };




// // Add updateUser, deleteUser similarly



import { UserModel } from '../models/usermodel';
export async function createUser(email: string, password: string, username?: string) {
  try {
    const newUser = await UserModel.create({
      data: { email, password, username },
    });
    console.log('User created:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function findUserByEmail(email: string) {
  try {
    const user = await UserModel.findUnique({ where: { email } });
    console.log('User found:', user);
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}




export async function findUserById(id: number) {
  try {
    const user = await UserModel.findUnique({ where: { id } });
    console.log('User found by ID:', user);
    return user;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
}



export async function updateUser(id: number, username: string) {
  try {
    const updatedUser = await UserModel.update({
      where: { id },
      data: { username },
    });
    console.log('User updated:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function deleteUser(id: number) {
  try {
    await UserModel.delete({ where: { id } });
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}
