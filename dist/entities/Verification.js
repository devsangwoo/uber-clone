"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var constants_1 = require("../constants");
var Verification = /** @class */ (function (_super) {
    __extends(Verification, _super);
    function Verification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Verification.prototype.createKey = function () {
        if (this.target === constants_1.PHONE) {
            this.key = Math.floor(Math.random() * 10000).toString();
        }
        else if (this.target === constants_1.EMAIL) {
            this.key = Math.random()
                .toString(36)
                .substr(2);
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Verification.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: "text", enum: [constants_1.PHONE, constants_1.EMAIL] }),
        __metadata("design:type", String)
    ], Verification.prototype, "target", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], Verification.prototype, "payload", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], Verification.prototype, "key", void 0);
    __decorate([
        typeorm_1.Column({ type: "boolean", default: false }),
        __metadata("design:type", Boolean)
    ], Verification.prototype, "verified", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], Verification.prototype, "createAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", String)
    ], Verification.prototype, "updateAt", void 0);
    __decorate([
        typeorm_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Verification.prototype, "createKey", null);
    Verification = __decorate([
        typeorm_1.Entity()
    ], Verification);
    return Verification;
}(typeorm_1.BaseEntity));
exports.default = Verification;
//# sourceMappingURL=Verification.js.map