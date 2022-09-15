import React, { useState, useEffect } from "react";
import { database } from '../../services/firebase';
import { useForm, useFieldArray } from 'react-hook-form';
import { auth } from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const BlockAdd = () => {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState<boolean>(true);
    const [typesList, setTypesList] = useState<{ item: string }[]>([]);
    const [levelList, setLevelList] = useState<{ item: string }[]>([]);
    const [focusList, setFocusList] = useState<{ item: string }[]>([]);
    const [equipmentList, setEquipmentList] = useState<{ item: string }[]>([]);
    const [propsList, setPropsList] = useState<{ item: string }[]>([]);
    const [newProp, setNewProp] = useState<string>('');
    const [blockAdded, setBlockAdded] = useState<boolean>(false);

    const lowerCaseAll = (str: string) => {
        return str.replace(/-/g, ' ').toLowerCase();
    };

    const capitalizeFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
    }

    const saveNewProp = (e: React.ChangeEvent<HTMLInputElement>) => {
        const prop = e.target.value;
        setNewProp(lowerCaseAll(prop));
    };

    const addNewProp = () => {
        let propsListCopy = [...propsList];
        propsListCopy.push({ "item": newProp });
        setPropsList(propsListCopy);
    };

    useEffect(() => {
        database.ref('types').child('list').on('value', function (snapshot) {
            setTypesList(snapshot.val());
        });
        database.ref('levels').child('list').on('value', function (snapshot) {
            setLevelList(snapshot.val());
        });
        database.ref('focus').child('list').on('value', function (snapshot) {
            setFocusList(snapshot.val());
        });
        database.ref('equipment').child('list').on('value', function (snapshot) {
            setEquipmentList(snapshot.val());
        });
        database.ref('props').child('list').on('value', function (snapshot) {
            setPropsList(snapshot.val());
        });
        setLoading(false);
    }, []);

    type FormValues = {
        title: string;
        type: string,
        focus: string,
        level: string,
        equipment: string,
        props: string[],
        start: string,
        instructions: { step: string }[];
    };

    const { control, register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            instructions: [{ step: '' }]
        }
    });

    const {
        fields: instructionsFields,
        append: instructionsAppend,
        remove: instructionsRemove
    } = useFieldArray({ control, name: 'instructions' });

    const onSubmit = handleSubmit(data => {
        let random: number = Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);
        database.ref('props')
            .set({
                list: propsList
            })
        database.ref('blocks')
            .child(Math.round(random).toString())
            .set({
                key: Math.round(random).toString(),
                title: data.title,
                type: data.type,
                level: data.level,
                focus: data.focus,
                equipment: data.equipment,
                props: data.props,
                start: data.start,
                instructions: data.instructions
            })
            .then(
                () => { setBlockAdded(true) }
            )
            .catch()
        }
    );

	if (!user){
        return (
            <div className="container stack-xl">
               <p>You need to be a user, loser.</p>
            </div>
        );
	}

    if (loading) {
        return (
            <div className="container stack-xl">
                <p>Just a moment while we find some props ...</p>
            </div>
        )
    }

    if (blockAdded) {
        return (
            <p>Block added!</p>
        )
    }   

    return (
        <div className="container stack-xl">
            <h1>Add a Block</h1>
            <form onSubmit={onSubmit} className="stack-xl">
                <fieldset className="stack-sm">
                    <label className="bold" htmlFor="title">Block title:</label>
                    <input type="text" id="title" {...register("title", { required: true })} />
                    {errors?.title && <p>{errors.title.message}</p>}
                </fieldset>

                <fieldset className="stack-sm">
                    <legend>Block type:</legend>
                    <div className="stack-xs">
                        <div className="stack-xs">
                            {typesList
                                .map((type, index) => {
                                    return (
                                        <div key={index}>
                                            <input type="radio" id={type.item} value={type.item} {...register("type", { required: true })} name="type" />
                                            <label htmlFor={type.item}>{capitalizeFirst(type.item)}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {errors.type && <p className="form-error">Please add a block type.</p>}
                </fieldset>

                <fieldset className="stack-sm">
                    <legend>Level:</legend>
                    <div className="stack-xs">
                        {levelList
                            .map((level, index) => {
                                return (
                                    <div key={index}>
                                        <input type="radio" id={level.item} value={level.item} {...register("level", { required: true })} name="level" />
                                        <label htmlFor={level.item}>{capitalizeFirst(level.item)}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {errors.level && <p className="form-error">Please add a level.</p>}
                </fieldset>

                <fieldset className="stack-sm">
                    <legend>Focus:</legend>
                    <div className="stack-xs">
                        {focusList
                            .map((focus, index) => {
                                return (
                                    <div key={index}>
                                        <input type="radio" id={focus.item} value={focus.item} {...register("focus", { required: true })} name="focus" />
                                        <label htmlFor={focus.item}>{capitalizeFirst(focus.item)}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {errors.focus && <p className="form-error">Please add a body focus.</p>}
                </fieldset>

                <fieldset className="stack-sm">
                    <legend>Equipment:</legend>
                    <div className="stack-xs">
                        {equipmentList
                            .map((equipment, index) => {
                                return (
                                    <div key={index}>
                                        <input type="radio" id={equipment.item} value={equipment.item} {...register("equipment", { required: true })} name="equipment" />
                                        <label htmlFor={equipment.item}>{capitalizeFirst(equipment.item)}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {errors.equipment && <p className="form-error">Please add equipment.</p>}
                </fieldset>

                <fieldset className="stack-sm">
                    <legend>Props:</legend>
                    <div className="flex-between">
                        <div className="stack-xs">
                            {propsList.length > 0 &&
                                propsList.map((prop, index) => {
                                    return (
                                        <div key={index}>
                                            <input type="checkbox" id={prop.item} value={prop.item} {...register("props", { required: true })} name="prop" />
                                            <label htmlFor={prop.item}>{capitalizeFirst(prop.item)}</label>
                                        </div>
                                    )
                                })
                            }
                            {errors.props && <p className="form-error">Please select at least one prop.</p>}
                        </div>
                        <div className="stack-xs">
                            <label htmlFor="newProp">Add a new prop:</label>
                            <input type="text" id="newProp" onChange={saveNewProp} />

                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={addNewProp}
                            >
                                Add New Prop
                            </button>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="stack-sm">
                    <label className="bold" htmlFor="start">Start position:</label>
                    <textarea id="start" {...register("start", { required: true })} placeholder="Add start position."></textarea>
                    {errors.start && <p className="form-error">Please add a start position.</p>}
                </fieldset>

                <fieldset className="stack-sm">
                    <legend>Instructions</legend>
                    <div className="stack-xs">
                        {instructionsFields.map((field, index) => (
                            <div className="stack-xs" key={field.id}>
                                <label htmlFor={`instructions${index}`}>Step {index + 1}</label>
                                <textarea
                                    {...register(`instructions.${index}.step`, { required: true })}
                                    id={`instructions${index}`}
                                    placeholder="Add at least one step."
                                    defaultValue={field.step}>
                                </textarea>
                                {instructionsFields.length > 1 &&
                                    <div>
                                        <button className="btn" type="button" onClick={() => instructionsRemove(index)}>Remove</button>
                                    </div>
                                }
                            </div>
                        ))}
                        {errors.instructions && <p className="form-error">Please include instructions for each step added.</p>}
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => instructionsAppend({ step: '' })}>
                            Add a Step
                        </button>
                    </div>
                </fieldset>

                <input type="submit" />
            </form>
        </div>
    )
}

export default BlockAdd;