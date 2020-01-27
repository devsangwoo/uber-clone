import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import Chat from "./Chat";
import Message from "./Message";
import Place from "./Place";
import Ride from "./Ride";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column({ type: "text", unique: true })
	@IsEmail()
	email: string | null;

	@Column({ type: "boolean", default: false })
	verifiedEmail: boolean;

	@Column({ type: "text" })
	firstName: string;

	@Column({ type: "text" })
	lastName: string;

	@Column({ type: "text", nullable: true })
	fbId: string;

	@Column({ type: "int", nullable: true })
	age: number;

	@Column({ type: "text", nullable: true })
	password: string;

	@Column({ type: "text", nullable: true })
	phoneNumber: string;

	@Column({ type: "boolean", default: false })
	verifiedPhoneNumber: boolean;

	@Column({
		type: "text",
		default: "http://simpleicon.com/wp-content/uploads/user1.svg",
		nullable: true
	})
	profilePhoto: string;

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;

	get fullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}

	@Column({ type: "boolean", default: false })
	isDriving: boolean;

	@Column({ type: "boolean", default: false })
	isTaken: boolean;

	@Column({ type: "double precision", default: 0 })
	lastLng: number;

	@Column({ type: "double precision", default: 0 })
	lastLat: number;

	@Column({ type: "double precision", default: 0 })
	lastOrientation: number;

	@OneToMany(
		type => Message,
		message => message.user
	)
	messages: Message[];

	@OneToMany(
		type => Ride,
		ride => ride.passenger
	)
	rideAsPassenger: Ride[];

	@OneToMany(
		type => Ride,
		ride => ride.driver
	)
	rideAsDriver: Ride[];

	@OneToMany(
		type => Chat,
		chat => chat.passenger
	)
	chatAsPassenger: Chat[];

	@OneToMany(
		type => Chat,
		chat => chat.driver
	)
	chatAsDriver: Chat[];

	@OneToMany(
		type => Place,
		place => place.user
	)
	places: Place[];

	@ManyToOne(
		type => Ride,
		ride => ride.currentUsers
	)
	currentRide: Ride;

	@Column({ nullable: true })
	currentRideId: number;

	public comparePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.password);
	}

	@BeforeInsert()
	@BeforeUpdate()
	async savePassword(): Promise<void> {
		if (this.password) {
			const hashedPassword = await this.hashPassword(this.password);
			this.password = hashedPassword;
		}
	}

	private hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, BCRYPT_ROUNDS);
	}
}

export default User;
