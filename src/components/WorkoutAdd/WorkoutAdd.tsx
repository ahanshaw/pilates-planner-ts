import React, { useState, useEffect } from "react";
import { database } from '../../services/firebase';
import { useForm } from 'react-hook-form';
import { auth } from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { WorkoutValues } from '../../services/interfaces';

const WorkoutAdd = () => {
    const [user, loading] = useAuthState(auth);
    const [workoutAdded, setWorkoutAdded] = useState<boolean>(false);
    const { control, register, handleSubmit, formState: { errors } } = useForm<WorkoutValues>();

    const onSubmit = handleSubmit((data: any) => {
        let random: number = Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);
        database.ref('workouts')
            .child(Math.round(random).toString())
            .set({
                key: Math.round(random).toString(),
                title: data.title,
                desription: data.desription,
                user: user?.uid
            })
            .then(
                () => { setWorkoutAdded(true) }
            )
            .catch()
        }
    );

    if (loading) {
        <div>Loading info ...</div>
    }

	if (!user){
        return (
            <div className="container stack-xl">
               <p>You need to be a user, loser.</p>
            </div>
        );
	}

    if (workoutAdded) {
        return (
            <p>Block added!</p>
        )
    }   

    return (
        <div className="container stack-xl">
            <h1>Create a New Workout</h1>
            <form onSubmit={onSubmit} className="stack-xl">
                <fieldset className="stack-sm">
                    <label className="bold" htmlFor="title">Workout title*:</label>
                    <input type="text" id="title" {...register("title", { required: true })} />
                    {errors?.title && <p>{errors.title.message}</p>}
                </fieldset>

                <fieldset className="stack-sm">
                    <label className="bold" htmlFor="start">Description:</label>
                    <textarea id="description" {...register("description")} placeholder="Add a description (optional)."></textarea>
                </fieldset>
                <input className="btn-primary" type="submit" />
            </form>
        </div>
    )
}

export default WorkoutAdd;