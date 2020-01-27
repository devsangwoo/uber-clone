import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import User from "./User";

@Entity()
class Place extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column({ type: "text" })
	name: string;

	@Column({ type: "double precision", default: 0 })
	lat: number;
	@Column({ type: "double precision", default: 0 })
	lng: number;

	@Column({ type: "text" })
	address: string;

	@Column({ type: "text", nullable: true })
	placeId: string;

	@Column({ type: "boolean", default: false })
	isFav: boolean;

	@Column({ type: "int", nullable: true }) // because user can turned off likes
	userId: number; // typeorm automatically get the userId

	@ManyToOne(
		type => User,
		user => user.places
	)
	user: User;

	@CreateDateColumn()
	createAt: string;

	@UpdateDateColumn() updateAt: string;
}

export default Place;
