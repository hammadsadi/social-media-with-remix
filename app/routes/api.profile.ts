import { ActionFunctionArgs } from "@remix-run/node";
import { UserModel } from "~/models/User";
import { DatabaseConnect } from "~/utils/database";
import { verifyToken } from "~/utils/JWTTokenGenerate";

export const loader = async ({ request }: ActionFunctionArgs) => {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized");
    }

    //  Verify Token
    const tokenId = verifyToken(token);
    // Connect MongoDB
    await DatabaseConnect();
    // Check User Exist or Not
    const checkUser = await UserModel.findById(tokenId);
    if (!checkUser) {
      throw new Error("User Not Found");
    }
    return new Response(JSON.stringify(checkUser), {
      status: 200,
    });
  } catch (error) {}
};
