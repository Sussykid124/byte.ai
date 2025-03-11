# Byte.ai

Byte.ai is an AI-assisted software development web application that provides an interactive chat interface to communicate with an advanced AI. It automatically generates code and integrates with GitHub to manage repositories. In addition, Byte.ai includes a dedicated account page where users can manage their account details and save their API keys (for OpenRouter and GitHub) directly to their account using Firebase Authentication and Firestore.

## Features

- **Chat Interface:**  
  Interact with an AI assistant that generates code snippets.  
- **GitHub Integration:**  
  Automatically create GitHub repositories and upload code files generated by the AI.
- **User Authentication:**  
  Sign in using Google, GitHub, or Email/Password via Firebase Authentication.
- **Account Management:**  
  A separate account page for managing API keys, resetting passwords, and deleting accounts.
- **API Key Persistence:**  
  Automatically save and load API keys from Firestore so that users do not have to reenter them each time they sign in.
- **Responsive Design:**  
  A modern and clean user interface with a navigation bar and separate pages for chat and account management.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Authentication & Database:** Firebase Authentication and Firestore
- **External APIs:** OpenRouter API for AI responses and GitHub API for repository management

## Link

- https://html-css-js.com/?html=%0A%3C!DOCTYPE%20html%3E%0A%3Chtml%20lang=%22en%22%3E%0A%3Chead%3E%0A%20%20%3Cmeta%20charset=%22UTF-8%22%3E%0A%20%20%3Ctitle%3EByte.ai%20-%20AI%20Assistant%3C/title%3E%0A%20%20%3Clink%20rel=%22stylesheet%22%20href=%22style.css%22%3E%0A%20%20%3C!--%20Firebase%20App%20(the%20core%20Firebase%20SDK)%20--%3E%0A%20%20%3Cscript%20src=%22https://www.gstatic.com/firebasejs/9.21.0/firebase-app-compat.js%22%3E%3C/script%3E%0A%20%20%3C!--%20Firebase%20Authentication%20--%3E%0A%20%20%3Cscript%20src=%22https://www.gstatic.com/firebasejs/9.21.0/firebase-auth-compat.js%22%3E%3C/script%3E%0A%20%20%3C!--%20Firebase%20Firestore%20--%3E%0A%20%20%3Cscript%20src=%22https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore-compat.js%22%3E%3C/script%3E%0A%3C/head%3E%0A%3Cbody%3E%0A%20%20%3C!--%20Sign-In%20Section%20(shown%20when%20not%20signed%20in)%20--%3E%0A%20%20%3Cdiv%20i$*$d=%22auth-container%22%20class=%22auth-container%22%3E%0A%20%20%20%20%3Ch2%3ESign%20In%20to%20Byte.ai%3C/h2%3E%0A%20%20%20%20%3Cdiv%20i$*$d=%22auth-buttons%22%3E%0A%20%20%20%20%20%20%3Cbutton%20i$*$d=%22google-signin%22%3ESign%20in%20with%20Google%3C/button%3E%0A%20%20%20%20%20%20%3Cbutton%20i$*$d=%22github-signin%22%3ESign%20in%20with%20GitHub%3C/button%3E%0A%20%20%20%20%3C/div%3E%0A%20%20%20%20%3Cdiv%20i$*$d=%22email-auth%22%3E%0A%20%20%20%20%20%20%3Ch3%3EEmail%20Sign%20In%20/%20Sign%20Up%3C/h3%3E%0A%20%20%20%20%20%20%3Cinput%20type=%22email%22%20i$*$d=%22email%22%20placeholder=%22Email%22%3E%0A%20%20%20%20%20%20%3Cinput%20type=%22password%22%20i$*$d=%22password%22%20placeholder=%22Password%22%3E%0A%20%20%20%20%20%20%3Cbutton%20i$*$d=%22email-signin%22%3ESign%20In%3C/button%3E%0A%20%20%20%20%20%20%3Cbutton%20i$*$d=%22email-signup%22%3ESign%20Up%3C/button%3E%0A%20%20%20%20%3C/div%3E%0A%20%20%3C/div%3E%0A%0A%20%20%3C!--%20Main%20App%20Section%20(shown%20when%20signed%20in)%20--%3E%0A%20%20%3Cdiv%20i$*$d=%22app-container%22%20class=%22hi$*$dden%22%3E%0A%20%20%20%20%3C!--%20Account%20Header%20with%20Management%20Buttons%20--%3E%0A%20%20%20%20%3Cheader%20class=%22account-header%22%3E%0A%20%20%20%20%20%20%3Cp%3ESigned%20in%20as%20%3Cspan%20i$*$d=%22user-email%22%3E%3C/span%3E%3C/p%3E%0A%20%20%20%20%20%20%3Cbutton%20i$*$d=%22sign-out-btn%22%3ESign%20Out%3C/button%3E%0A%20%20%20%20%20%20%3Cbutton%20i$*$d=%22reset-password-btn%22%3EReset%20Password%3C/button%3E%0A%20%20%20%20%20%20%3Cbutton%20i$*$d=%22delete-account-btn%22%3EDelete%20Account%3C/button%3E%0A%20%20%20%20%3C/header%3E%0A%20%20%20%20%3Cdiv%20class=%22container%22%3E%0A%20%20%20%20%20%20%3Ch1%3EByte.ai%20-%20AI%20Assistant%3C/h1%3E%0A%20%20%20%20%20%20%3Cdiv%20i$*$d=%22chat-history%22%20class=%22chat-history%22%3E%3C/div%3E%0A%20%20%20%20%20%20%3Cform%20i$*$d=%22chat-form%22%3E%0A%20%20%20%20%20%20%20%20%3Ctextarea%20i$*$d=%22message%22%20placeholder=%22Enter%20your%20message...%22%20required%3E%3C/textarea%3E%0A%20%20%20%20%20%20%20%20%3Cbutton%20type=%22submit%22%3ESend%20Message%3C/button%3E%0A%20%20%20%20%20%20%3C/form%3E%0A%20%20%20%20%20%20%3Chr%3E%0A%20%20%20%20%20%20%3Ch3%3EDelete%20File%20from%20GitHub%3C/h3%3E%0A%20%20%20%20%20%20%3Cform%20i$*$d=%22delete-form%22%3E%0A%20%20%20%20%20%20%20%20%3Cinput%20type=%22text%22%20i$*$d=%22filepath%22%20placeholder=%22File%20Path%20(relative%20to%20repo)%22%20required%3E%0A%20%20%20%20%20%20%20%20%3Cinput%20type=%22text%22%20i$*$d=%22projectName%22%20placeholder=%22Project%20Name%22%20value=%22my_project%22%20required%3E%0A%20%20%20%20%20%20%20%20%3Cbutton%20type=%22submit%22%3EDelete%20File%3C/button%3E%0A%20%20%20%20%20%20%3C/form%3E%0A%20%20%20%20%20%20%3Cdiv%20i$*$d=%22notifications%22%3E%3C/div%3E%0A%20%20%20%20%20%20%3Chr%3E%0A%20%20%20%20%20%20%3Cdiv%20class=%22api-settings%22%3E%0A%20%20%20%20%20%20%20%20%3Ch3%3EAPI%20Settings%3C/h3%3E%0A%20%20%20%20%20%20%20%20%3Cp%3E%0A%20%20%20%20%20%20%20%20%20%20%3Clabel%20for=%22openrouterKey%22%3EOpenRouter%20API%20Key:%3C/label%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cinput%20type=%22text%22%20i$*$d=%22openrouterKey%22%20placeholder=%22Your%20OpenRouter%20API%20Key%22%3E%0A%20%20%20%20%20%20%20%20%3C/p%3E%0A%20%20%20%20%20%20%20%20%3Cp%3E%0A%20%20%20%20%20%20%20%20%20%20%3Clabel%20for=%22githubToken%22%3EGitHub%20Token:%3C/label%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cinput%20type=%22text%22%20i$*$d=%22githubToken%22%20placeholder=%22Your%20GitHub%20Token%22%3E%0A%20%20%20%20%20%20%20%20%3C/p%3E%0A%20%20%20%20%20%20%20%20%3Cbutton%20i$*$d=%22save-api-keys%22%3ESave%20API%20Keys%3C/button%3E%0A%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%3C/div%3E%0A%20%20%3C/div%3E%0A%0A%20%20%3C!--%20Firebase%20Configuration%20and%20Initialization%20--%3E%0A%20%20%3Cscript%3E%0A%20%20%20%20const%20firebaseConfig%20=%20%7B%0A%20%20%20%20%20%20apiKey:%20%22AIzaSyAULtzmjxaxkEFT0Lbn8VoJhIuZvSlUevg%22,%0A%20%20%20%20%20%20authDomain:%20%22byteai-72f09.firebaseapp.com%22,%0A%20%20%20%20%20%20projectId:%20%22byteai-72f09%22,%0A%20%20%20%20%20%20storageBucket:%20%22byteai-72f09.firebasestorage.app%22,%0A%20%20%20%20%20%20messagingSenderId:%20%2238172675483%22,%0A%20%20%20%20%20%20appId:%20%221:38172675483:web:d58333c480c6dc46b9253e%22,%0A%20%20%20%20%20%20measurementId:%20%22G-TD0PPN6LYZ%22%0A%20%20%20%20%7D;%0A%20%20%20%20//%20Initialize%20Firebase%20before%20using%20any%20Firebase%20services%0A%20%20%20%20firebase.initializeApp(firebaseConfig);%0A%20%20%3C/script%3E%0A%0A%20%20%3C!--%20Main%20Script%20--%3E%0A%20%20%3Cscript%20src=%22script.js%22%3E%3C/script%3E%0A%3C/body%3E%0A%3C/html%3E&css=%0Abody%20%7B%0A%20%20font-family:%20Arial,%20sans-serif;%0A%20%20background-color:%20#f4f4f4;%0A%20%20margin:%200;%0A%20%20padding:%2020px;%0A%7D%0A.hi$*$dden%20%7B%0A%20%20display:%20none;%0A%7D%0A.auth-container%20%7B%0A%20%20max-wi$*$dth:%20400px;%0A%20%20margin:%202em%20auto;%0A%20%20background:%20#fff;%0A%20%20padding:%2020px;%0A%20%20border-radius:%204px;%0A%20%20text-align:%20center;%0A%20%20border:%201px%20soli$*$d%20#ccc;%0A%7D%0A.auth-container%20input%20%7B%0A%20%20wi$*$dth:%2090%25;%0A%20%20padding:%2010px;%0A%20%20margin:%205px%200;%0A%20%20border:%201px%20soli$*$d%20#ccc;%0A%20%20border-radius:%204px;%0A%7D%0A.auth-container%20button%20%7B%0A%20%20padding:%2010px%2020px;%0A%20%20margin:%205px;%0A%20%20background:%20#007bff;%0A%20%20border:%20none;%0A%20%20border-radius:%204px;%0A%20%20color:%20#fff;%0A%20%20cursor:%20pointer;%0A%7D%0A.auth-container%20button:hover%20%7B%0A%20%20background:%20#0056b3;%0A%7D%0A.account-header%20%7B%0A%20%20display:%20flex;%0A%20%20justify-content:%20space-between;%0A%20%20align-items:%20center;%0A%20%20background:%20#e9ecef;%0A%20%20padding:%2010px;%0A%20%20border-radius:%204px;%0A%20%20margin-bottom:%2020px;%0A%7D%0A.account-header%20p%20%7B%0A%20%20margin:%200;%0A%7D%0A.container%20%7B%0A%20%20max-wi$*$dth:%20800px;%0A%20%20margin:%20auto;%0A%20%20background:%20#fff;%0A%20%20padding:%2020px;%0A%20%20border-radius:%204px;%0A%7D%0Ah1,%20h2,%20h3%20%7B%0A%20%20text-align:%20center;%0A%20%20color:%20#333;%0A%7D%0A.chat-history%20%7B%0A%20%20border:%201px%20soli$*$d%20#ccc;%0A%20%20padding:%2010px;%0A%20%20height:%20300px;%0A%20%20overflow-y:%20auto;%0A%20%20background:%20#fafafa;%0A%20%20margin-bottom:%2020px;%0A%7D%0A.chat-entry%20%7B%0A%20%20margin-bottom:%2010px;%0A%20%20padding:%205px;%0A%20%20border-bottom:%201px%20soli$*$d%20#eee;%0A%7D%0A.chat-entry.user%20%7B%0A%20%20color:%20#007bff;%0A%7D%0A.chat-entry.assistant%20%7B%0A%20%20color:%20#28a745;%0A%7D%0Aform%20%7B%0A%20%20margin-bottom:%2020px;%0A%7D%0Atextarea,%20input%5Btype=%22text%22%5D%20%7B%0A%20%20wi$*$dth:%20100%25;%0A%20%20padding:%2010px;%0A%20%20margin:%205px%200%2010px;%0A%20%20border:%201px%20soli$*$d%20#ccc;%0A%20%20border-radius:%204px;%0A%7D%0Abutton%20%7B%0A%20%20padding:%2010px%2020px;%0A%20%20background:%20#007bff;%0A%20%20border:%20none;%0A%20%20border-radius:%204px;%0A%20%20color:%20#fff;%0A%20%20cursor:%20pointer;%0A%7D%0Abutton:hover%20%7B%0A%20%20background:%20#0056b3;%0A%7D%0A.api-settings%20%7B%0A%20%20background:%20#e9ecef;%0A%20%20padding:%2010px;%0A%20%20border-radius:%204px;%0A%7D%0A#notifications%20%7B%0A%20%20margin-top:%2010px;%0A%20%20text-align:%20center;%0A%20%20font-weight:%20bold;%0A%7D%0A%09%20%20&js=%0A//%20Initialize%20Firebase%20Auth%20and%20Firestore%0Aconst%20auth%20=%20firebase.auth();%0Aconst%20db%20=%20firebase.firestore();%0A%0A//%20DOM%20Elements%20for%20Authentication%20and%20Account%20Management%0Aconst%20authContainer%20=%20document.getElementById(%22auth-container%22);%0Aconst%20appContainer%20=%20document.getElementById(%22app-container%22);%0Aconst%20userEmailSpan%20=%20document.getElementById(%22user-email%22);%0Aconst%20signOutBtn%20=%20document.getElementById(%22sign-out-btn%22);%0Aconst%20resetPasswordBtn%20=%20document.getElementById(%22reset-password-btn%22);%0Aconst%20deleteAccountBtn%20=%20document.getElementById(%22delete-account-btn%22);%0Aconst%20saveApiKeysBtn%20=%20document.getElementById(%22save-api-keys%22);%0A%0Aconst%20googleBtn%20=%20document.getElementById(%22google-signin%22);%0Aconst%20githubBtn%20=%20document.getElementById(%22github-signin%22);%0Aconst%20emailSignInBtn%20=%20document.getElementById(%22email-signin%22);%0Aconst%20emailSignUpBtn%20=%20document.getElementById(%22email-signup%22);%0A%0Aconst%20emailInput%20=%20document.getElementById(%22email%22);%0Aconst%20passwordInput%20=%20document.getElementById(%22password%22);%0A%0A//%20DOM%20Elements%20for%20API%20Keys%0Aconst%20openrouterKeyInput%20=%20document.getElementById(%22openrouterKey%22);%0Aconst%20githubTokenInput%20=%20document.getElementById(%22githubToken%22);%0A%0A//%20---%20Authentication%20Handlers%20---%0A%0A//%20Google%20Sign%20In%0AgoogleBtn.addEventListener(%22click%22,%20async%20()%20=%3E%20%7B%0A%20%20const%20provi$*$der%20=%20new%20firebase.auth.GoogleAuthProvi$*$der();%0A%20%20try%20%7B%0A%20%20%20%20await%20auth.signInWithPopup(provi$*$der);%0A%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20notify(%22Google%20sign-in%20error:%20%22%20+%20error.message);%0A%20%20%7D%0A%7D);%0A%0A//%20GitHub%20Sign%20In%20%E2%80%93%20automatically%20save%20the%20GitHub%20access%20token%20if%20not%20already%20set%0AgithubBtn.addEventListener(%22click%22,%20async%20()%20=%3E%20%7B%0A%20%20const%20provi$*$der%20=%20new%20firebase.auth.GithubAuthProvi$*$der();%0A%20%20//%20Optionally,%20add%20the%20required%20scopes%0A%20%20provi$*$der.addScope(%22repo%22);%0A%20%20try%20%7B%0A%20%20%20%20const%20result%20=%20await%20auth.signInWithPopup(provi$*$der);%0A%20%20%20%20//%20Extract%20the%20GitHub%20access%20token%20from%20the%20credential%0A%20%20%20%20const%20credential%20=%20firebase.auth.GithubAuthProvi$*$der.credentialFromResult(result);%0A%20%20%20%20if%20(credential)%20%7B%0A%20%20%20%20%20%20const%20token%20=%20credential.accessToken;%0A%20%20%20%20%20%20const%20user%20=%20result.user;%0A%20%20%20%20%20%20//%20Save%20the%20token%20automatically%20if%20not%20already%20saved%0A%20%20%20%20%20%20const%20userDocRef%20=%20db.collection(%22users%22).doc(user.ui$*$d);%0A%20%20%20%20%20%20const%20doc%20=%20await%20userDocRef.get();%0A%20%20%20%20%20%20if%20(!doc.exists%20%7C%7C%20!doc.data().githubToken)%20%7B%0A%20%20%20%20%20%20%20%20await%20userDocRef.set(%7B%20githubToken:%20token%20%7D,%20%7B%20merge:%20true%20%7D);%0A%20%20%20%20%20%20%20%20githubTokenInput.value%20=%20token;%0A%20%20%20%20%20%20%20%20notify(%22GitHub%20token%20automatically%20saved.%22,%20%22success%22);%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20notify(%22GitHub%20sign-in%20error:%20%22%20+%20error.message);%0A%20%20%7D%0A%7D);%0A%0A//%20Email%20Sign%20In%0AemailSignInBtn.addEventListener(%22click%22,%20async%20()%20=%3E%20%7B%0A%20%20const%20email%20=%20emailInput.value;%0A%20%20const%20password%20=%20passwordInput.value;%0A%20%20try%20%7B%0A%20%20%20%20await%20auth.signInWithEmailAndPassword(email,%20password);%0A%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20notify(%22Email%20sign-in%20error:%20%22%20+%20error.message);%0A%20%20%7D%0A%7D);%0A%0A//%20Email%20Sign%20Up%0AemailSignUpBtn.addEventListener(%22click%22,%20async%20()%20=%3E%20%7B%0A%20%20const%20email%20=%20emailInput.value;%0A%20%20const%20password%20=%20passwordInput.value;%0A%20%20try%20%7B%0A%20%20%20%20await%20auth.createUserWithEmailAndPassword(email,%20password);%0A%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20notify(%22Email%20sign-up%20error:%20%22%20+%20error.message);%0A%20%20%7D%0A%7D);%0A%0A//%20Sign%20Out%0AsignOutBtn.addEventListener(%22click%22,%20async%20()%20=%3E%20%7B%0A%20%20try%20%7B%0A%20%20%20%20await%20auth.signOut();%0A%20%20%20%20notify(%22Signed%20out%20successfully.%22,%20%22success%22);%0A%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20notify(%22Sign-out%20error:%20%22%20+%20error.message);%0A%20%20%7D%0A%7D);%0A%0A//%20Reset%20Password%0AresetPasswordBtn.addEventListener(%22click%22,%20async%20()%20=%3E%20%7B%0A%20%20const%20user%20=%20auth.currentUser;%0A%20%20if%20(user)%20%7B%0A%20%20%20%20try%20%7B%0A%20%20%20%20%20%20await%20auth.sendPasswordResetEmail(user.email);%0A%20%20%20%20%20%20notify(%22Password%20reset%20email%20sent.%22,%20%22success%22);%0A%20%20%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20%20%20notify(%22Reset%20password%20error:%20%22%20+%20error.message);%0A%20%20%20%20%7D%0A%20%20%7D%20else%20%7B%0A%20%20%20%20notify(%22No%20user%20is%20signed%20in.%22);%0A%20%20%7D%0A%7D);%0A%0A//%20Delete%20Account%0AdeleteAccountBtn.addEventListener(%22click%22,%20async%20()%20=%3E%20%7B%0A%20%20const%20user%20=%20auth.currentUser;%0A%20%20if%20(user)%20%7B%0A%20%20%20%20if%20(confirm(%22Are%20you%20sure%20you%20want%20to%20delete%20your%20account?%20This%20action%20cannot%20be%20undone.%22))%20%7B%0A%20%20%20%20%20%20try%20%7B%0A%20%20%20%20%20%20%20%20await%20user.delete();%0A%20%20%20%20%20%20%20%20notify(%22Account%20deleted%20successfully.%22,%20%22success%22);%0A%20%20%20%20%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20%20%20%20%20notify(%22Delete%20account%20error:%20%22%20+%20error.message);%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%20else%20%7B%0A%20%20%20%20notify(%22No%20user%20is%20signed%20in.%22);%0A%20%20%7D%0A%7D);%0A%0A//%20Save%20API%20Keys%20to%20Firestore%20for%20the%20current%20user%0AsaveApiKeysBtn.addEventListener(%22click%22,%20async%20()%20=%3E%20%7B%0A%20%20const%20user%20=%20auth.currentUser;%0A%20%20if%20(user)%20%7B%0A%20%20%20%20const%20apiData%20=%20%7B%0A%20%20%20%20%20%20openrouterKey:%20openrouterKeyInput.value.trim(),%0A%20%20%20%20%20%20githubToken:%20githubTokenInput.value.trim()%0A%20%20%20%20%7D;%0A%20%20%20%20try%20%7B%0A%20%20%20%20%20%20await%20db.collection(%22users%22).doc(user.ui$*$d).set(apiData,%20%7B%20merge:%20true%20%7D);%0A%20%20%20%20%20%20notify(%22API%20keys%20saved.%22,%20%22success%22);%0A%20%20%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20%20%20notify(%22Error%20saving%20API%20keys:%20%22%20+%20error.message);%0A%20%20%20%20%7D%0A%20%20%7D%20else%20%7B%0A%20%20%20%20notify(%22You%20must%20be%20signed%20in%20to%20save%20API%20keys.%22);%0A%20%20%7D%0A%7D);%0A%0A//%20Listen%20for%20auth%20state%20changes%20to%20update%20the%20UI%20and%20load%20API%20keys%0Aauth.onAuthStateChanged(user%20=%3E%20%7B%0A%20%20if%20(user)%20%7B%0A%20%20%20%20userEmailSpan.textContent%20=%20user.email;%0A%20%20%20%20authContainer.classList.add(%22hi$*$dden%22);%0A%20%20%20%20appContainer.classList.remove(%22hi$*$dden%22);%0A%20%20%20%20//%20Load%20user's%20saved%20API%20keys%20from%20Firestore%0A%20%20%20%20db.collection(%22users%22).doc(user.ui$*$d).get().then(doc%20=%3E%20%7B%0A%20%20%20%20%20%20if%20(doc.exists)%20%7B%0A%20%20%20%20%20%20%20%20const%20data%20=%20doc.data();%0A%20%20%20%20%20%20%20%20openrouterKeyInput.value%20=%20data.openrouterKey%20%7C%7C%20%22%22;%0A%20%20%20%20%20%20%20%20githubTokenInput.value%20=%20data.githubToken%20%7C%7C%20%22%22;%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D).catch(error%20=%3E%20%7B%0A%20%20%20%20%20%20console.error(%22Error%20loading%20API%20keys:%20%22,%20error);%0A%20%20%20%20%20%20notify(%22Error%20loading%20API%20keys:%20%22%20+%20error.message);%0A%20%20%20%20%7D);%0A%20%20%7D%20else%20%7B%0A%20%20%20%20authContainer.classList.remove(%22hi$*$dden%22);%0A%20%20%20%20appContainer.classList.add(%22hi$*$dden%22);%0A%20%20%7D%0A%7D);%0A%0A//%20Global%20variables%20for%20conversation%20memory%20and%20repository%20URL%20cache%0Alet%20conversationMemory%20=%20%5B%5D;%0Aconst%20repoUrlCache%20=%20%7B%7D;%0A%0A//%20Utility%20function%20to%20display%20notifications%0Afunction%20notify(message,%20type%20=%20%22error%22)%20%7B%0A%20%20const%20notifications%20=%20document.getElementById(%22notifications%22);%0A%20%20notifications.textContent%20=%20message;%0A%20%20notifications.style.color%20=%20type%20===%20%22error%22%20?%20%22#d9534f%22%20:%20%22#28a745%22;%0A%20%20setTimeout(()%20=%3E%20%7B%20notifications.textContent%20=%20%22%22;%20%7D,%205000);%0A%7D%0A%0A//%20Append%20a%20chat%20entry%20to%20the%20chat%20history%0Afunction%20appendChatEntry(role,%20text)%20%7B%0A%20%20const%20chatHistory%20=%20document.getElementById(%22chat-history%22);%0A%20%20const%20entry%20=%20document.createElement(%22div%22);%0A%20%20entry.classList.add(%22chat-entry%22,%20role);%0A%20%20entry.innerHTML%20=%20%60%3Cstrong%3E$%7Brole.charAt(0).toUpperCase()%20+%20role.slice(1)%7D:%3C/strong%3E%20$%7Btext%7D%60;%0A%20%20chatHistory.appendChild(entry);%0A%20%20chatHistory.scrollTop%20=%20chatHistory.scrollHeight;%0A%7D%0A%0A//%20Extract%20code%20blocks%20from%20AI%20response%20using%20regex%20with%20%22#%20FILE:%22%20marker.%0Afunction%20extractCodeBlocks(response)%20%7B%0A%20%20const%20regex%20=%20/%60%60%60(?:%5Cw+)?%5Cs*%5Cn%5Cs*(#%20FILE:%5Cs*(%5CS+))%5Cs*%5Cn(%5B%5Cs%5CS%5D*?)%60%60%60/g;%0A%20%20const%20blocks%20=%20%5B%5D;%0A%20%20let%20match;%0A%20%20while%20((match%20=%20regex.exec(response))%20!==%20null)%20%7B%0A%20%20%20%20const%20filename%20=%20match%5B2%5D.trim();%0A%20%20%20%20const%20code%20=%20match%5B3%5D.trim();%0A%20%20%20%20blocks.push(%7B%20filename,%20code%20%7D);%0A%20%20%7D%0A%20%20return%20blocks;%0A%7D%0A%0A//%20Extract%20project%20name%20using%20%22#%20PROJECT:%22%20marker.%0Afunction%20extractProjectName(response)%20%7B%0A%20%20const%20regex%20=%20/#%20PROJECT:%5Cs*(%5CS+)/;%0A%20%20const%20match%20=%20regex.exec(response);%0A%20%20return%20match%20?%20match%5B1%5D.trim()%20:%20%22my_project%22;%0A%7D%0A%0A//%20Send%20a%20message%20to%20the%20OpenRouter%20API%0Aasync%20function%20sendMessageToAI(message)%20%7B%0A%20%20const%20openrouterKey%20=%20openrouterKeyInput.value.trim();%0A%20%20if%20(!openrouterKey)%20%7B%0A%20%20%20%20notify(%22Please%20enter%20your%20OpenRouter%20API%20Key.%22);%0A%20%20%20%20return;%0A%20%20%7D%0A%20%20const%20systemPrompt%20=%20%7B%0A%20%20%20%20role:%20%22system%22,%0A%20%20%20%20content:%20%22You%20are%20Byte.ai,%20an%20advanced%20AI%20specialized%20in%20software%20development.%20Your%20tasks%20include%20understanding%20high-level%20prompts,%20planning%20software%20projects,%20generating%20clean%20code%20wrapped%20in%20triple%20backticks%20(%60%60%60),%20and%20IMPORTANT:%20Place%20'#%20FILE:%20filename.extension'%20insi$*$de%20the%20code%20at%20the%20start%20of%20each%20code,%20make%20it%20the%20first%20line%20of%20your%20code%20insi$*$de%20your%20%60%60%60,%20DO%20NOT%20PUT%20OUTSIDE,%20it%20should%20be%20first%20line%20of%20every%20script%20you%20write%20NO%20MATTER%20WHAT.%20Also,%20include%20a%20line%20starting%20with%20'#%20PROJECT:'%20followed%20by%20the%20project%20folder%20name.%20This%20should%20be%20at%20the%20start%20of%20every%20response%20outsi$*$de%20of%20the%20,%20the%20first%20thing%20sai$*$d,%20NOT%20IN%20THE%20CODE%20BLOCKS,%20this%20line%20will%20not%20be%20located%20insi$*$de%20you%20%60%60%60,%20it%20will%20be%20as%20the%20first%20thing%20you%20say.%20Always%20generate%20a%20README.md%20file%20describing%20the%20project,%20including%20setup%20instructions,%20usage,%20and%20features.%20If%20a%20Python%20file%20is%20created,%20generate%20a%20requirements.txt%20listing%20all%20dependencies.%20If%20a%20JavaScript%20file%20is%20created,%20generate%20a%20package.json%20with%20dependencies%20if%20needed.%20Add%20build%20automation%20scripts:%20build.sh%20for%20Linux/Mac%20and%20build.bat%20for%20Windows%20if%20applicable.%20Create%20a%20.gitignore%20file%20for%20Git%20if%20applicable.%20Log%20execution%20outputs%20and%20errors%20in%20a%20logs/execution.log%20file%20insi$*$de%20the%20project%20directory.%20Always%20remember%20to%20not%20add%20ANY%20EXTRA%20TEXT,%20apart%20from%20code%20and%20stuff%20ive%20stated,%20and%20remember%20everything%20i%20have%20sai$*$d%20throughout.%22%0A%20%20%7D;%0A%0A%20%20const%20payload%20=%20%7B%0A%20%20%20%20model:%20%22deepseek/deepseek-chat:free%22,%0A%20%20%20%20messages:%20%5BsystemPrompt,%20...conversationMemory,%20%7B%20role:%20%22user%22,%20content:%20message%20%7D%5D,%0A%20%20%20%20temperature:%200.7%0A%20%20%7D;%0A%0A%20%20try%20%7B%0A%20%20%20%20const%20response%20=%20await%20fetch(%22https://openrouter.ai/api/v1/chat/completions%22,%20%7B%0A%20%20%20%20%20%20method:%20%22POST%22,%0A%20%20%20%20%20%20headers:%20%7B%0A%20%20%20%20%20%20%20%20%22Authorization%22:%20%60Bearer%20$%7BopenrouterKey%7D%60,%0A%20%20%20%20%20%20%20%20%22Content-Type%22:%20%22application/json%22%0A%20%20%20%20%20%20%7D,%0A%20%20%20%20%20%20body:%20JSON.stringify(payload)%0A%20%20%20%20%7D);%0A%20%20%20%20if%20(!response.ok)%20%7B%0A%20%20%20%20%20%20throw%20new%20Error(%22Failed%20to%20get%20response%20from%20AI%22);%0A%20%20%20%20%7D%0A%20%20%20%20const%20data%20=%20await%20response.json();%0A%20%20%20%20if%20(data.choices%20$**$$**$%20data.choices.length%20%3E%200)%20%7B%0A%20%20%20%20%20%20return%20data.choices%5B0%5D.message.content.trim();%0A%20%20%20%20%7D%0A%20%20%20%20return%20%22No%20response%20from%20AI.%22;%0A%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20notify(%22Error%20sending%20message%20to%20AI:%20%22%20+%20error.message);%0A%20%20%20%20return%20%22%22;%0A%20%20%7D%0A%7D%0A%0A//%20Create%20GitHub%20repository%20via%20the%20GitHub%20API%0Aasync%20function%20createGithubRepo(repoName,%20githubToken)%20%7B%0A%20%20const%20url%20=%20%22https://api.github.com/user/repos%22;%0A%20%20const%20payload%20=%20%7B%20name:%20repoName,%20private:%20false%20%7D;%0A%20%20try%20%7B%0A%20%20%20%20const%20response%20=%20await%20fetch(url,%20%7B%0A%20%20%20%20%20%20method:%20%22POST%22,%0A%20%20%20%20%20%20headers:%20%7B%0A%20%20%20%20%20%20%20%20%22Authorization%22:%20%60Bearer%20$%7BgithubToken%7D%60,%0A%20%20%20%20%20%20%20%20%22Content-Type%22:%20%22application/json%22%0A%20%20%20%20%20%20%7D,%0A%20%20%20%20%20%20body:%20JSON.stringify(payload)%0A%20%20%20%20%7D);%0A%20%20%20%20if%20(response.status%20===%20201)%20%7B%0A%20%20%20%20%20%20const%20data%20=%20await%20response.json();%0A%20%20%20%20%20%20return%20data.html_url;%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20const%20errorData%20=%20await%20response.json();%0A%20%20%20%20%20%20console.error(%22GitHub%20repo%20creation%20error:%22,%20errorData);%0A%20%20%20%20%20%20//%20If%20repository%20already%20exists,%20try%20to%20construct%20URL%20from%20username%0A%20%20%20%20%20%20if%20(errorData.message%20$**$$**$%20errorData.message.includes(%22name%20already%20exists%22))%20%7B%0A%20%20%20%20%20%20%20%20const%20userResp%20=%20await%20fetch(%22https://api.github.com/user%22,%20%7B%0A%20%20%20%20%20%20%20%20%20%20headers:%20%7B%20%22Authorization%22:%20%60Bearer%20$%7BgithubToken%7D%60%20%7D%0A%20%20%20%20%20%20%20%20%7D);%0A%20%20%20%20%20%20%20%20const%20userData%20=%20await%20userResp.json();%0A%20%20%20%20%20%20%20%20return%20%60https://github.com/$%7BuserData.login%7D/$%7BrepoName%7D%60;%0A%20%20%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%20%20throw%20new%20Error(errorData.message%20%7C%7C%20%22Failed%20to%20create%20GitHub%20repository%22);%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20notify(%22Repo%20creation%20error:%20%22%20+%20error.message);%0A%20%20%20%20return%20null;%0A%20%20%7D%0A%7D%0A%0A//%20Upload%20file%20to%20GitHub%20using%20the%20API%0Aasync%20function%20uploadFileToGithub(repoUrl,%20filepath,%20code,%20githubToken)%20%7B%0A%20%20try%20%7B%0A%20%20%20%20const%20parts%20=%20repoUrl.replace(%22https://github.com/%22,%20%22%22).split(%22/%22);%0A%20%20%20%20const%20owner%20=%20parts%5B0%5D;%0A%20%20%20%20const%20repoName%20=%20parts%5B1%5D;%0A%20%20%20%20const%20apiUrl%20=%20%60https://api.github.com/repos/$%7Bowner%7D/$%7BrepoName%7D/contents/$%7Bfilepath%7D%60;%0A%20%20%20%20let%20sha%20=%20null;%0A%20%20%20%20const%20getResponse%20=%20await%20fetch(apiUrl,%20%7B%0A%20%20%20%20%20%20headers:%20%7B%0A%20%20%20%20%20%20%20%20%22Authorization%22:%20%60Bearer%20$%7BgithubToken%7D%60,%0A%20%20%20%20%20%20%20%20%22Accept%22:%20%22application/vnd.github.v3+json%22%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D);%0A%20%20%20%20if%20(getResponse.ok)%20%7B%0A%20%20%20%20%20%20const%20fileData%20=%20await%20getResponse.json();%0A%20%20%20%20%20%20sha%20=%20fileData.sha;%0A%20%20%20%20%7D%0A%20%20%20%20const%20encodedContent%20=%20btoa(code);%0A%20%20%20%20const%20payload%20=%20%7B%0A%20%20%20%20%20%20message:%20sha%20?%20%60Update%20$%7Bfilepath%7D%60%20:%20%60Add%20$%7Bfilepath%7D%60,%0A%20%20%20%20%20%20content:%20encodedContent,%0A%20%20%20%20%20%20branch:%20%22main%22%0A%20%20%20%20%7D;%0A%20%20%20%20if%20(sha)%20payload.sha%20=%20sha;%0A%20%20%20%20const%20putResponse%20=%20await%20fetch(apiUrl,%20%7B%0A%20%20%20%20%20%20method:%20%22PUT%22,%0A%20%20%20%20%20%20headers:%20%7B%0A%20%20%20%20%20%20%20%20%22Authorization%22:%20%60Bearer%20$%7BgithubToken%7D%60,%0A%20%20%20%20%20%20%20%20%22Accept%22:%20%22application/vnd.github.v3+json%22,%0A%20%20%20%20%20%20%20%20%22Content-Type%22:%20%22application/json%22%0A%20%20%20%20%20%20%7D,%0A%20%20%20%20%20%20body:%20JSON.stringify(payload)%0A%20%20%20%20%7D);%0A%20%20%20%20if%20(!putResponse.ok)%20%7B%0A%20%20%20%20%20%20const%20errorData%20=%20await%20putResponse.json();%0A%20%20%20%20%20%20throw%20new%20Error(errorData.message%20%7C%7C%20%60Failed%20to%20upload%20$%7Bfilepath%7D%60);%0A%20%20%20%20%7D%0A%20%20%20%20return%20true;%0A%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20notify(%22Upload%20error:%20%22%20+%20error.message);%0A%20%20%20%20return%20false;%0A%20%20%7D%0A%7D%0A%0A//%20Delete%20a%20file%20from%20GitHub%20using%20the%20API%0Aasync%20function%20deleteFileFromGithub(repoUrl,%20filepath,%20githubToken)%20%7B%0A%20%20try%20%7B%0A%20%20%20%20const%20parts%20=%20repoUrl.replace(%22https://github.com/%22,%20%22%22).split(%22/%22);%0A%20%20%20%20const%20owner%20=%20parts%5B0%5D;%0A%20%20%20%20const%20repoName%20=%20parts%5B1%5D;%0A%20%20%20%20const%20apiUrl%20=%20%60https://api.github.com/repos/$%7Bowner%7D/$%7BrepoName%7D/contents/$%7Bfilepath%7D%60;%0A%20%20%20%20const%20getResponse%20=%20await%20fetch(apiUrl,%20%7B%0A%20%20%20%20%20%20headers:%20%7B%0A%20%20%20%20%20%20%20%20%22Authorization%22:%20%60Bearer%20$%7BgithubToken%7D%60,%0A%20%20%20%20%20%20%20%20%22Accept%22:%20%22application/vnd.github.v3+json%22%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D);%0A%20%20%20%20if%20(!getResponse.ok)%20%7B%0A%20%20%20%20%20%20const%20errorData%20=%20await%20getResponse.json();%0A%20%20%20%20%20%20throw%20new%20Error(errorData.message%20%7C%7C%20%60Failed%20to%20get%20file%20info%20for%20$%7Bfilepath%7D%60);%0A%20%20%20%20%7D%0A%20%20%20%20const%20fileData%20=%20await%20getResponse.json();%0A%20%20%20%20const%20fileSha%20=%20fileData.sha;%0A%20%20%20%20const%20payload%20=%20%7B%20message:%20%60Delete%20$%7Bfilepath%7D%60,%20sha:%20fileSha,%20branch:%20%22main%22%20%7D;%0A%20%20%20%20const%20deleteResponse%20=%20await%20fetch(apiUrl,%20%7B%0A%20%20%20%20%20%20method:%20%22DELETE%22,%0A%20%20%20%20%20%20headers:%20%7B%0A%20%20%20%20%20%20%20%20%22Authorization%22:%20%60Bearer%20$%7BgithubToken%7D%60,%0A%20%20%20%20%20%20%20%20%22Accept%22:%20%22application/vnd.github.v3+json%22,%0A%20%20%20%20%20%20%20%20%22Content-Type%22:%20%22application/json%22%0A%20%20%20%20%20%20%7D,%0A%20%20%20%20%20%20body:%20JSON.stringify(payload)%0A%20%20%20%20%7D);%0A%20%20%20%20if%20(!deleteResponse.ok)%20%7B%0A%20%20%20%20%20%20const%20errorData%20=%20await%20deleteResponse.json();%0A%20%20%20%20%20%20throw%20new%20Error(errorData.message%20%7C%7C%20%60Failed%20to%20delete%20$%7Bfilepath%7D%60);%0A%20%20%20%20%7D%0A%20%20%20%20return%20true;%0A%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20notify(%22Delete%20file%20error:%20%22%20+%20error.message);%0A%20%20%20%20return%20false;%0A%20%20%7D%0A%7D%0A%0A//%20Handler%20for%20chat%20form%20submission%0Adocument.getElementById(%22chat-form%22).addEventListener(%22submit%22,%20async%20(e)%20=%3E%20%7B%0A%20%20e.preventDefault();%0A%20%20const%20messageInput%20=%20document.getElementById(%22message%22);%0A%20%20const%20message%20=%20messageInput.value.trim();%0A%20%20if%20(!message)%20return;%0A%20%20appendChatEntry(%22user%22,%20message);%0A%20%20messageInput.value%20=%20%22%22;%0A%20%20%0A%20%20//%20Send%20message%20to%20AI%0A%20%20const%20aiResponse%20=%20await%20sendMessageToAI(message);%0A%20%20if%20(!aiResponse)%20return;%0A%20%20appendChatEntry(%22assistant%22,%20aiResponse);%0A%20%20conversationMemory.push(%7B%20role:%20%22user%22,%20content:%20message%20%7D);%0A%20%20conversationMemory.push(%7B%20role:%20%22assistant%22,%20content:%20aiResponse%20%7D);%0A%20%20%0A%20%20//%20Process%20code%20blocks%20and%20upload%20files%0A%20%20const%20projectName%20=%20extractProjectName(aiResponse);%0A%20%20const%20codeBlocks%20=%20extractCodeBlocks(aiResponse);%0A%20%20if%20(codeBlocks.length%20===%200)%20%7B%0A%20%20%20%20notify(%22No%20code%20blocks%20extracted%20from%20AI%20response.%22,%20%22info%22);%0A%20%20%20%20return;%0A%20%20%7D%0A%20%20const%20githubToken%20=%20githubTokenInput.value.trim();%0A%20%20if%20(!githubToken)%20%7B%0A%20%20%20%20notify(%22Please%20enter%20your%20GitHub%20Token%20in%20the%20API%20Settings.%22);%0A%20%20%20%20return;%0A%20%20%7D%0A%20%20let%20repoUrl%20=%20repoUrlCache%5BprojectName%5D;%0A%20%20if%20(!repoUrl)%20%7B%0A%20%20%20%20repoUrl%20=%20await%20createGithubRepo(projectName,%20githubToken);%0A%20%20%20%20if%20(!repoUrl)%20%7B%0A%20%20%20%20%20%20notify(%22Repository%20creation%20failed.%22);%0A%20%20%20%20%20%20return;%0A%20%20%20%20%7D%0A%20%20%20%20repoUrlCache%5BprojectName%5D%20=%20repoUrl;%0A%20%20%7D%0A%20%20for%20(const%20block%20of%20codeBlocks)%20%7B%0A%20%20%20%20const%20success%20=%20await%20uploadFileToGithub(repoUrl,%20block.filename,%20block.code,%20githubToken);%0A%20%20%20%20if%20(success)%20%7B%0A%20%20%20%20%20%20notify(%60File%20$%7Bblock.filename%7D%20uploaded%20successfully.%60,%20%22success%22);%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D);%0A%0A//%20Handler%20for%20delete%20form%20submission%0Adocument.getElementById(%22delete-form%22).addEventListener(%22submit%22,%20async%20(e)%20=%3E%20%7B%0A%20%20e.preventDefault();%0A%20%20const%20filepath%20=%20document.getElementById(%22filepath%22).value.trim();%0A%20%20const%20projectName%20=%20document.getElementById(%22projectName%22).value.trim();%0A%20%20const%20githubToken%20=%20githubTokenInput.value.trim();%0A%20%20if%20(!githubToken)%20%7B%0A%20%20%20%20notify(%22Please%20enter%20your%20GitHub%20Token%20in%20the%20API%20Settings.%22);%0A%20%20%20%20return;%0A%20%20%7D%0A%20%20let%20repoUrl%20=%20repoUrlCache%5BprojectName%5D;%0A%20%20if%20(!repoUrl)%20%7B%0A%20%20%20%20repoUrl%20=%20await%20createGithubRepo(projectName,%20githubToken);%0A%20%20%20%20if%20(!repoUrl)%20%7B%0A%20%20%20%20%20%20notify(%22Repository%20creation%20failed.%22);%0A%20%20%20%20%20%20return;%0A%20%20%20%20%7D%0A%20%20%20%20repoUrlCache%5BprojectName%5D%20=%20repoUrl;%0A%20%20%7D%0A%20%20const%20success%20=%20await%20deleteFileFromGithub(repoUrl,%20filepath,%20githubToken);%0A%20%20if%20(success)%20%7B%0A%20%20%20%20notify(%60File%20$%7Bfilepath%7D%20deleted%20successfully.%60,%20%22success%22);%0A%20%20%7D%0A%7D);%0A


