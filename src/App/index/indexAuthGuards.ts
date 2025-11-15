import { AdmPermissionGuard } from "../guards/AdmPermission.Guard";
import { JwtAuthGuard } from "../guards/JwtAuth.Guard";
import { UserIdguard } from "../guards/UserId.Guard";

export const AllGuards = [
    AdmPermissionGuard,
    JwtAuthGuard,
    UserIdguard
]