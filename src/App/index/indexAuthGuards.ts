import { admPermissionguard } from "../guards/admPermission.Guard";
import { JwtAuthGuard } from "../guards/JwtAuth.Guard";
import { UserIdguard } from "../guards/UserId.Guard";

export const AllGuards = [
    admPermissionguard,
    JwtAuthGuard,
    UserIdguard
]