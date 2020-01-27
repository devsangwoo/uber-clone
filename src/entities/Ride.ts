import { rideStatus } from "src/types/types";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { ACCEPTED, CANCELED, FINISHED, ONROUTE, REQUESTED } from "../constants";
import Chat from "./Chat";
import User from "./User";

@Entity()
class Ride extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column({
		type: "text",
		enum: [ACCEPTED, CANCELED, FINISHED, ONROUTE, REQUESTED],
		default: REQUESTED
	})
	status: rideStatus;

	@Column({ type: "text" })
	pickUpAddress: string;

	@Column({ type: "double precision", default: 0 })
	pickUpLat: number;

	@Column({ type: "double precision", default: 0 })
	pickUpLng: number;

	@Column({ type: "text" })
	dropOffAddress: string;

	@Column({ type: "double precision", default: 0 })
	dropOffLat: number;

	@Column({ type: "double precision", default: 0 })
	dropOffLng: number;

	@Column({ type: "double precision", default: 0 })
	price: number;

	@Column({ type: "text", default: "null" })
	distance: string;

	@Column({ type: "text", default: "null" })
	duration: string;

	@ManyToOne(
		type => User,
		user => user.rideAsPassenger
	)
	passenger: User;

	@Column({ nullable: true })
	passengerId: number;

	@ManyToOne(
		type => User,
		user => user.rideAsDriver
	)
	driver: User;

	@Column({ nullable: true })
	driverId: number;

	@OneToMany(
		type => User,
		user => user.currentRide
	)
	currentUsers: User[];

	@OneToOne(
		type => Chat,
		chat => chat.ride
	)
	@JoinColumn()
	chat: Chat;

	@Column({ nullable: true })
	chatId: number;

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;

	// @beforeInsert
	// @beforeUpdate
	// calculateThePrice, distance, duration
}

export default Ride;
