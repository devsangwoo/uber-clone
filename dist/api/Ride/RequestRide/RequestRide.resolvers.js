"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../../constants");
var Ride_1 = __importDefault(require("../../../entities/Ride"));
var User_1 = __importDefault(require("../../../entities/User"));
var resolverProtector_1 = require("../../../utils/resolverProtector");
var resolvers = {
    Mutation: {
        RequestRide: resolverProtector_1.authResolverProtector(function (_, args, _a) {
            var req = _a.req, pubSub = _a.pubSub;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, existedRide, ride, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            user = req.user;
                            if (user.currentRideId) {
                                return [2 /*return*/, {
                                        res: false,
                                        error: "You are \"already on route now",
                                        ride: null
                                    }];
                            }
                            if (user.isDriving) {
                                return [2 /*return*/, {
                                        res: false,
                                        error: "you are a driver",
                                        ride: null
                                    }];
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, Ride_1.default.findOne(__assign(__assign({}, args), { passenger: user }))];
                        case 2:
                            existedRide = _b.sent();
                            if (existedRide) {
                                existedRide.remove();
                            }
                            return [4 /*yield*/, Ride_1.default.create(__assign(__assign({}, args), { passenger: user })).save()];
                        case 3:
                            ride = _b.sent();
                            return [4 /*yield*/, User_1.default.update({ id: user.id }, { currentRide: ride })];
                        case 4:
                            _b.sent();
                            pubSub.publish(constants_1.RIDE_REQUEST, {
                                RideSubscription: ride
                            });
                            return [2 /*return*/, {
                                    res: true,
                                    error: null,
                                    ride: ride
                                }];
                        case 5:
                            error_1 = _b.sent();
                            return [2 /*return*/, {
                                    res: false,
                                    error: error_1.message,
                                    ride: null
                                }];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        })
    }
};
exports.default = resolvers;
//# sourceMappingURL=RequestRide.resolvers.js.map