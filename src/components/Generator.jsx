import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
    numbers,
    upperCaseLetters,
    lowerCaseLetters,
    specialCharacters,
} from './characters'

function Generator() {


    const [moreThan20, setMoreThan20] = useState(true);
    const [password, setPassword] = useState('')
    const [passwordLength, setPasswordLength] = useState(35)
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(true)
    
    useEffect(() => {
        if (
            !includeUppercase &&
            !includeLowercase &&
            !includeNumbers &&
            !includeSymbols
          ) {
            return;
        }
        
        if(moreThan20 === false && passwordLength >= 31){
            setPasswordLength(30);
        }
        handleGeneratePassword();
    }, [moreThan20, passwordLength, includeLowercase, includeNumbers, includeUppercase, includeSymbols])

    const handleGeneratePassword = (e) => {
        if (
          !includeUppercase &&
          !includeLowercase &&
          !includeNumbers &&
          !includeSymbols
        ) {
          notify('You must Select atleast one option', true)
          return;
        }
        let characterList = ''
    
        if (includeLowercase) {
          characterList = characterList + lowerCaseLetters
        }
    
        if (includeUppercase) {
          characterList = characterList + upperCaseLetters
        }
    
        if (includeNumbers) {
          characterList = characterList + numbers
        }
    
        if (includeSymbols) {
          characterList = characterList + specialCharacters
        }
    
        setPassword(createPassword(characterList))
    }
    const createPassword = (characterList) => {
        let password = ''
        const characterListLength = characterList.length

        if(passwordLength <= 0) {
            notify('Password cant be equal or less than 0', true)
            return
        }
    
        for (let i = 0; i < passwordLength; i++) {
          const characterIndex = Math.round(Math.random() * characterListLength)
          password = password + characterList.charAt(characterIndex)
        }

        return password
    }

    const copyToClipboard = () => {
        const newTextArea = document.createElement('textarea')
        newTextArea.innerText = password
        document.body.appendChild(newTextArea)
        newTextArea.select()
        document.execCommand('copy')
        newTextArea.remove()
    }

    const notify = (message, hasError = false) => {
    if (hasError) {
        toast.error(<div><CloseIcon style={{color: 'red', verticalAlign: 'middle'}} />  {message}</div>, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff'
          },
        })
    } else {
        toast(<div><DoneIcon style={{color: 'green', verticalAlign: 'middle'}} />  {message}</div>, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
    }
    }

    const handleCopyPassword = (e) => {
        if (password === '') {
            notify('Nothing To Copy', true)
        } else {
            copyToClipboard()
            notify("Password successfully copied to clipboard")
        }
    }

    return (
        <>
            <div className="Generator">
                
                <ToastContainer
                    position='top-right'
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="length">
                    <label htmlFor='password-strength'>Set length: </label>
                    {moreThan20 ? 
                    
                    <input
                        defaultValue={passwordLength}
                        onChange={(e) => setPasswordLength(e.target.value)}
                        type='number'
                        id='password-strength'
                        name='password-strength'
                        min='0'
                    />
                    :
                    <input 
                        type="range"
                        defaultValue={passwordLength}
                        onChange={(e) => setPasswordLength(e.target.value)}
                        id='password-strength-input'
                        name='password-strength'
                        min='0'
                        max='30'
                    />
                    }
                </div>
                <div>
                    <div>
                        <label htmlFor='uppercase-letters'>Include Uppercase Letters</label>
                        <input
                            className="include-checkbox"
                            checked={includeUppercase}
                            onChange={(e) => setIncludeUppercase(e.target.checked)}
                            type='checkbox'
                            id='uppercase-letters'
                            name='uppercase-letters'
                        />
                    </div>
                    <div>
                        <label htmlFor='lowercase-letters'>Include Lowercase Letters</label>
                        <input
                            className="include-checkbox"
                            checked={includeLowercase}
                            onChange={(e) => setIncludeLowercase(e.target.checked)}
                            type='checkbox'
                            id='lowercase-letters'
                            name='lowercase-letters'
                        />
                    </div>
                    <div>
                        <label htmlFor='include-numbers'>Include Numbers</label>
                        <input
                            className="include-checkbox"
                            checked={includeNumbers}
                            onChange={(e) => setIncludeNumbers(e.target.checked)}
                            type='checkbox'
                            id='include-numbers'
                            name='include-numbers'
                        />
                    </div>
                    <div>
                        <label htmlFor='include-symbols'>Include Symbols</label>
                        <input
                            className="include-checkbox"
                            checked={includeSymbols}
                            onChange={(e) => setIncludeSymbols(e.target.checked)}
                            type='checkbox'
                            id='include-symbols'
                            name='include-symbols'
                        />
                    </div>
                    <div className="generator__btn_div">
                        <button onClick={handleGeneratePassword} className='generator__btn'>
                        <LockOutlinedIcon className="LockIconButton" /> <span className="verticalAlign">Generate Password</span>
                        </button>
                    </div>
                </div>
            </div>
            {passwordLength <= 30 ? 
                <div className="display-password">
                    
                        <p className="password">
                            <button 
                                onClick={handleCopyPassword}
                                className="copy-icon">
                                    <ion-icon style={{ verticalAlign: 'middle'}}  name="clipboard-outline"></ion-icon> Copy password 
                            </button>
                            <br /><br />
                            <span>
                                {password}
                            </span>
                        </p>
                </div>
                :
                    <div className="display-password-l">
                        <p className="password">
                            <button 
                                onClick={handleCopyPassword}
                                className="copy-icon"><ion-icon style={{ verticalAlign: 'middle'}}  name="clipboard-outline"></ion-icon> Copy Password 
                            </button><br /><br />
                            <span>{password}</span>
                            
                        </p>
                    </div>
                }
            
        </>
    )
}

export default Generator;
