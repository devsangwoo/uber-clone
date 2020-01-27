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
import Message from "./Message";
import Ride from "./Ride";
import User from "./User";

@Entity()
class Chat extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@OneToMany(
		type => Message,
		message => message.chat
	)
	messages: Message[];

	@Column({ nullable: true })
	driverId: number;

	@ManyToOne(
		type => User,
		user => user.chatAsDriver
	)
	driver: User;

	@Column({ nullable: true })
	passengerId: number;

	@ManyToOne(
		type => User,
		user => user.chatAsPassenger
	)
	passenger: User;

	@OneToOne(
		type => Ride,
		ride => ride.chat
	)
	@JoinColumn()
	ride: Ride;

	@Column({ nullable: true })
	rideId: number;

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;
}

export default Chat;
