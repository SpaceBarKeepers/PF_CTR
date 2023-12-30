import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
@Injectable()
export class JwtWithoutDeviceAuthGuard extends AuthGuard('jwt-without-device') {}
@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {}
@Injectable()
export class JwtAdminGuard extends AuthGuard('jwt-admin') {}
@Injectable()
export class JwtAdminRefreshGuard extends AuthGuard('jwt-admin-refresh') {}
