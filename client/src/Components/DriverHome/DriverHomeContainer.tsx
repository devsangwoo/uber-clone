import { useMutation, useQuery, useSubscription } from "@apollo/react-hooks";
import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Routes from "../../Routes";
import {
	GetNearbyRides,
	RideSubscription,
	RideSubscription_RideSubscription,
	TakeRequestedRide,
	TakeRequestedRideVariables
} from "../../types/api";
import DriverHomePresenter from "./DriverHomePresenter";
import {
	GET_NEARBY_RIDES,
	RIDE_SUBSCRIPTION,
	TAKE_REQUESTED_RIDE
} from "./DriverHomeQueries";

interface IProps extends RouteComponentProps {}

export interface IRequest extends RideSubscription_RideSubscription {}

const DriverHomeContainer: React.FC<IProps> = ({ history }) => {
	// array state how to add, delete contentes
	const [rideQueue] = useState<IRequest[]>([]);
	const [currentRide, setCurrentRide] = useState<IRequest>();

	// only when requested ride is existed, and user is not taken yet
	useQuery<GetNearbyRides>(GET_NEARBY_RIDES, {
		onCompleted: ({ GetNearbyRides }) => {
			const { res, error, rides } = GetNearbyRides;
			if (res && rides) {
				rides.forEach(ride => {
					if (ride) {
						rideQueue.push(ride);
						if (!currentRide) {
							setCurrentRide(ride);
						}
					}
				});
			} else {
				toast.error(error);
			}
		}
	});

	useSubscription<RideSubscription>(RIDE_SUBSCRIPTION, {
		onSubscriptionComplete: () => {
			console.log("now it's waiting for the new ride requeste");
		},
		onSubscriptionData: ({ subscriptionData }) => {
			const { data, error } = subscriptionData;
			if (data) {
				const ride = data.RideSubscription;
				if (ride) {
					rideQueue.push(ride);
					if (!currentRide) {
						setCurrentRide(ride);
					}
				}
			} else {
				toast.error(error);
			}
		}
	});

	const [takeRequestMutation] = useMutation<
		TakeRequestedRide,
		TakeRequestedRideVariables
	>(TAKE_REQUESTED_RIDE);

	const onCancelHandler = () => {
		if (rideQueue) {
			rideQueue.shift();
			setCurrentRide(rideQueue[0]);
		}
	};

	const onAcceptHandler = (rideId: number) => {
		takeRequestMutation({ variables: { rideId } });
		history.push(`${Routes.RIDE}${rideId}`);
	};

	// even ride queue updated, it still showing ride popup
	return (
		<DriverHomePresenter
			ride={currentRide}
			onCancelHandler={onCancelHandler}
			onAcceptHandler={onAcceptHandler}
		/>
	);
};

export default withRouter(DriverHomeContainer);
