import { useState, useEffect, useMemo  } from 'react';
import Input from '../components/Zooggle/Input';
import PulseLoader from 'react-spinners/PulseLoader';
import debounce from 'lodash.debounce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBook, faExclamationCircle, faLink, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Select } from '@material-tailwind/react';



const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

function Dictionnaire() {
  const [searchTerm, setSearchTerm] = useState('');
  const [definitions, setDefinition] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

 

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== '') {
        searchDefinition();
      }
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);


  const searchDefinition = async () => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}/${searchTerm}`);
    const data = await response.json();
    console.log(data);
    if (data.title === 'No Definitions Found') {
        //setDefinition('No definitions found');
        // same but it's an array
        setDefinition([]);
    } else {
     
        const newDefinitions = data[0].meanings.map((meaning : any) => {
            return {
              partOfSpeech: meaning.partOfSpeech,
              definitions: meaning.definitions.map((definition : any) => definition.definition),
              examples : meaning.definitions.map((definition : any) => definition.example),
            };
          });
            setDefinition(newDefinitions);
    }
    setIsLoading(false);
    };
    



  const handleCopy = () => {
    toast.success(' Lien copié !');
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    
  };

  const isDefinitionAvailable = definitions.length > 0;


  return (

    <div className="flex flex-col items-center justify-center min-h-screen py-2" >
        < ToastContainer />


      <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 py-6 space-y-4 rounded-lg shadow-xl border-2 border-white
      " style={{ width: "70%", marginTop: "50px", backdropFilter:"blur(40px)",color : "white", backgroundColor : "#00000013"}}>
      <h1 className="text-4xl font-bold mb-2" style={{color: 'white'}}>
          <FontAwesomeIcon icon={faBook} className="mr-4" color='white' style={{marginRight: '0.5rem'}} />
          Dictionnaire
          </h1>
        <Input label={'Tapez un mot'} type={'text'}   placeholder={'try...'} onChange={(e) => setSearchTerm(e.target.value)} />
        {/* <button className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-green-400 hover:text-white"
        onClick={handleSearch}>  Rechercher </button> */}
        <p className="text-center text-sm text-white">
          Les définitions sont fournies par <a href="https://dictionaryapi.dev/" target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-600">dictionaryapi.dev</a>
        </p>

        </div>

        {!isDefinitionAvailable && searchTerm !== '' && !isLoading && 
         (
            <div className="mt-4 bg-white rounded-lg shadow-xl w-full max-w-2xl px-4 py-6 space-y-4 justify-items-center">
                <h1 className="text-2xl font-bold mb-2">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" color='orange' style={{marginRight: '0.5rem'}} />
                  Aucune définition trouvée</h1>
            </div>
        )}


        {isLoading && (
            <div className="mt-4">
                <PulseLoader color="#00BFA6" />
            </div>
        )}
        {isDefinitionAvailable && searchTerm !== ''  && (
            <div className="mt-4">
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <span onClick={handleCopy} className="cursor-pointer">
                        <h1 className="text-2xl font-bold mb-2 bg-green-800 p-2 text-white rounded-full">
                            {searchTerm}
                            <FontAwesomeIcon icon={faLink} className="ml-2" color='white' style={{marginRight: '0.5rem'}} />
                            </h1>
                        </span>


                        
                        {definitions.map((definition: any, index: number) => (
                            <div key={index} className="mt-4 shadow-xl rounded-lg p-4" style= {{backgroundColor: 'lightgreen'}}>
                                <h1 className="text-xl font-bold mb-2 text-justify">
                                  {definition.partOfSpeech === "noun" ? "nom" : definition.partOfSpeech === "verb" ? "verbe" : definition.partOfSpeech === "adjective" ? "adjectif" : definition.partOfSpeech === "adverb" ? "adverbe" : definition.partOfSpeech === "preposition" ? "préposition" : definition.partOfSpeech === "conjunction" ? "conjonction" :definition.partOfSpeech }</h1>
                                
                                {definition.definitions.map((definition: any, index: number) => (
                                    <div key={index}>
                                        <p className="mb-2 text-justify">
                                          {index + 1}. {" "}{definition}
                                        </p>
                                        
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        {/* <CopyToClipboard text={currentUrl} onCopy={handleCopy}>
                            <Button
                                color="light-green"
                                className="w-96"
                            >
                                Copier le lien
                            </Button>
                        </CopyToClipboard> */}
                     {/*    <Button color="light-green" className="w-96" onClick={() => {navigator.clipboard.writeText(currentUrl);}} /> */}
                        
                    </div>
                </div>
            </div>
        )}
    </div>
    );
}

export default Dictionnaire;



            
