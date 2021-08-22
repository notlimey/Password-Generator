import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CloseIcon from '@material-ui/icons/Close';
import {
    numbers,
    upperCaseLetters,
    lowerCaseLetters,
    specialCharacters,
} from './characters'

const COPY_SUCCESS = 'Password successfully copied to clipboard'

function Generator() {
    const [moreThan20, setMoreThan20] = useState(false);
    const [password, setPassword] = useState('')
    const [passwordLength, setPasswordLength] = useState(20)
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(true)

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
        notify('Success!', false)
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
        toast.error(message, {
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
        toast(message, {
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
            notify(COPY_SUCCESS)
        }
    }

    return (
        <div>
            <div>
                <lable>More than 20 characters long</lable>
                <input 
                    defaultValue={moreThan20}
                    onChange={(e) => setMoreThan20(e.target.checked)}
                    type="checkbox"
                    id='more-than-20'
                    name='more-than-20'
                />

            </div>
            <button onClick={handleGeneratePassword} className='generator__btn'>
                Generate Password
            </button>
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
            <div>

                <label htmlFor='password-strength'>Password length: {passwordLength}</label>
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
                    id='password-strength'
                    name='password-strength'
                    min='0'
                    max='20'
                />
                }
            </div>
            <div>
                <div>
                    <label htmlFor='uppercase-letters'>Include Uppercase Letters</label>
                    <input
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
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                        type='checkbox'
                        id='include-symbols'
                        name='include-symbols'
                    />
                </div>
            </div>
            <p><button 
                onClick={handleCopyPassword}
                className="copy-icon"><ion-icon name="clipboard-outline"></ion-icon></button>{password}</p>
        </div>
    )
}

export default Generator;
