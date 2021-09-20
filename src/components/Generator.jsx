import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import {
    numbers,
    upperCaseLetters,
    lowerCaseLetters,
    specialCharacters,
} from './characters'

function Generator() {
    const [password, setPassword] = useState('')
    const [passwordLength, setPasswordLength] = useState(12)
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(true)
    
    useEffect(() => {
        setPassword('');
    }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

    function handleGeneratePassword() {
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
            toast.error('Password cant be equal or less than 0', true)
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

    console.log(password);

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
                    <label htmlFor='password-strength'>Set length: </label><br />
                    <input
                        defaultValue={passwordLength}
                        onChange={(e) => setPasswordLength(e.target.value)}
                        type='number'
                        id='password-strength'
                        name='password-strength'
                        min='0'
                    />
                </div>
                <div className="generator-options">
                        <label class="toggle" for="includeUppercase">
                            Include uppercase letters
                            <input type="checkbox" class="toggle__input" id="includeUppercase" 
                                checked={includeUppercase}
                                onChange={(e) => setIncludeUppercase(e.target.checked)}
                            />
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                            <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                        </label>
                        <label class="toggle" for="includeLowercase">
                            Include lowercase letters
                            <input type="checkbox" class="toggle__input" id="includeLowercase" 
                                checked={includeLowercase}
                                onChange={(e) => setIncludeLowercase(e.target.checked)}
                            />
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                            <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                        </label>
                        <label class="toggle" for="includeNumbers">
                            Include numbers
                            <input type="checkbox" class="toggle__input" id="includeNumbers" 
                                checked={includeNumbers}
                                onChange={(e) => setIncludeNumbers(e.target.checked)}
                            />
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                            <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                        </label>
                        <label class="toggle" for="includeSymbols">
                            Include symbols
                            <input type="checkbox" class="toggle__input" id="includeSymbols" 
                                checked={includeSymbols}
                                onChange={(e) => setIncludeSymbols(e.target.checked)}
                            />
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                            <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                        </label>
                </div>
                <div className="generator__btn_div">
                    <button onClick={handleGeneratePassword} className='generator__btn'>
                    <LockOutlinedIcon className="LockIconButton" /> <span className="verticalAlign">Generate Password</span>
                    </button>
                </div>
            </div>
            <div className="space__"></div>
            
                {passwordLength <= 30 ? 
                    <>
                        {passwordLength <= 0 || password === undefined || password === "" ? <></> :
                        <>
                            <div className="password">
                                <p className="short-psw">{password}</p>
                            </div>
                            <div className="copy__button">
                                <button onClick={handleCopyPassword}>
                                <FileCopyOutlinedIcon className="copyButtonIcon" /> <span className="verticalAlign">Copy password</span>
                                </button>
                            </div>
                        </> }
                    </>
                : 
                    <>
                        {password === "" ? <></> :
                        <>
                        <div className="copy__button">
                            <button onClick={handleCopyPassword}>
                            <FileCopyOutlinedIcon className="copyButtonIcon" /> <span className="verticalAlign">Copy password</span>
                            </button>
                        </div>
                        <div className="password">
                            <p className="long-psw">{password}</p>
                        </div>
                        </>}
                    </>
                }
        </>
    );
}

export default Generator;
