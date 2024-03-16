import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  public static async hashPwd(pwd: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(pwd, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }

  public static async compoarePwd(storedPwd: string, enterPwd: string) {
    const [hashPwd, salt] = storedPwd.split(".");

    const hashEnterPwd = (await scryptAsync(enterPwd, salt, 64)) as Buffer;

    return hashEnterPwd.toString("hex") === hashPwd;
  }
}
