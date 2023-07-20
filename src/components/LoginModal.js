import { useRef } from 'react';
import { useDispatchContext, useStateContext } from '../utils/reducerContext'
import styles from './LoginModal.module.css'
import { ACTIONS } from '../utils/actions';

export default function LoginModal(){
    const state = useStateContext();
    const dispatch = useDispatchContext();
    const overlayRef = useRef();
    return (
        <>
            {state.isModalToggled && 
                <section 
                    className={styles.overlay}
                    ref={overlayRef}
                    onClick={(e)=>{
                        if(e.target === overlayRef.current){
                            dispatch({type: ACTIONS.SET_IS_MODAL_TOGGLED, payload: false})
                        }
                    }}
                >
                    <div className={styles.container}>
                        <h1 className={styles.header}>Create Account</h1>
                        <form 
                            action="submit"
                            className={styles.accountCreation}
                        >
                            <label 
                                htmlFor="username"
                                className={styles.label}
                            >Username
                            </label>
                            <input 
                                type="text" 
                                id='username' 
                                className={styles.input}
                                placeholder='Username'
                            />
                            <label 
                                htmlFor="password"
                                className={styles.label}
                            >Password
                            </label>
                            <input 
                                type="password" 
                                id='password' 
                                className={styles.input} 
                                placeholder='Password'
                            />
                        </form>
                    </div>
                </section>
            }
        </>
    )
}