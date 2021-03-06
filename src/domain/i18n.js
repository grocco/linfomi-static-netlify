import React from 'react';
import { connect } from 'react-redux';
import config from 'config';

class StringStateInjector extends React.Component {
    render() {
        const {
            word,
            args
        } = this.props;
        const text = this.props.text;
        const finalText = text
        .replace("/word/", word)
        .replace("/code/", args.code || '')
        .replace("/amount/", args.amount || '')
        .replace("/email/", args.email || '')
        .replace("/description/", args.description || '')
        return finalText
    }
}

const mapStateToProps = state => ({
    word: state.ui.word,
    args: state.ui.currentModalArguments || {}
});

const ReadFromState = connect(mapStateToProps)(StringStateInjector)
  
const modal = {
    descriptions: {
        onDonate: {
            en: 'Checking credit card validity...',
            it: 'Verificando la validità della carta di credito...'
        } 
    },
    DONATION_START: {
        content: {
            en: <div className='modal-text'>We are processing your transaction.<br/>Checking credit card validity...</div>,
            it: <div className='modal-text'>Stiamo processando la vostra transazione.<br/>Verificando la validità della carta di credito...</div>
        },
        title: {
            en: 'Transaction in progress',
            it: 'Transazione in corso'
        }
    },
    DONATION_SUCCESSFUL: {
        content: {
            en: <div className='modal-text'>You donated <ReadFromState text="/amount/"/> CHF.<br/>A receipt has been sent to <ReadFromState text="/email/"/></div>,
            it: <div className='modal-text'>Ha donato <ReadFromState text="/amount/"/> CHF.<br/>Le abbiamo spedito una ricevuta a <ReadFromState text="/email/"/></div>
        },
        title: {
            en: 'Thank you for your donation!',
            it: 'Grazie per la sua donazione!'
        },
        buttonLeft: {
            text: {
                en: 'CLOSE',
                it: 'CHIUDI'
            }
        }
    }
}

const header = {
    logo: {
        forThe: {
            it: "per l'",
            en: 'for the'
        },
        of1: {
            it: null,
            en: 'of'
        },
        of2: {
            it: 'di',
            en: null
        },
        foundation: {
            it: 'Fondazione',
            en: 'Foundation'
        },
        institute: {
            it: 'Istituto',
            en: 'Institute'
        },
        oncology: {
            it: 'oncologico',
            en: 'oncology'
        },
        research: {
            it: 'ricerca',
            en: 'research'
        }

    },
    buttons: config.version === 2 ? {
        // home: {
        //     title: {
        //         en: "Welcome",
        //         it: "Benvenuti",
        //     }
        // },
        link_ior: {
            title: {
                it: 'Istituto oncologico di ricerca',
                en: 'Institute of oncology research'
            },
            address: {
                it: 'http://www.ior.iosi.ch/',
                en: 'http://www.ior.iosi.ch/'
            }
        },
        link_ielsg: {
            title: {
                it: 'International Extranodal Lymphoma Study Group',
                en: 'International Extranodal Lymphoma Study Group'
            },
            address: {
                it: 'http://www.ielsg.org/',
                en: 'http://www.ielsg.org/'
            }
        },
        link_icml: {
            title: {
                it: 'Conferenza Internazionale sui Linfomi Maligni',
                en: 'International Conference on Malignant Lymphoma'
            },
            address: {
                it: 'http://www.lymphcon.ch/',
                en: 'http://www.lymphcon.ch/'
            }
        },
        home: {
            title: {
                en: "Home",
                it: "Pagina iniziale",
            }
        },
        "council": {
            title: {
                en: "Board",
                it: "Comitato",
            }
        },
        "scientific": {
            title: {
                en: "Past Members and Scientific Council",
                it: "Membri in passato e Consiglio Scientifico",
            }
        },
        "members": {
            title: {
                en: "Board of Trustees",
                it: "Consiglio di Fondazione",
            }
        },
        "president": {
            title: {
                en: "President",
                it: "Presidente",
            }
        },
        "donations-and-contacts": {
            title: {
                en: "Donations and Contacts",
                it: "Donazioni e Contatti",
            }
        },
        foundation: {
            title: {
                en: "Foundation IOR",
                it: "Fondazione IOR",
            }
        },
        ior: {
            title: {
                en: "IOR",
                it: "IOR",
            }
        },
        "ielsg": {
            title: {
                en: "IELSG",
                it: "IELSG",
            }
        },
        "icml": {
            title: {
                en: "ICML",
                it: "ICML",
            }
        },
        home3: {
            title: {
                en: "Home3",
                it: "Pagina iniziale",
            }
        },
        "council3": {
            title: {
                en: "Board3",
                it: "Comitato",
            }
        },
        "donations-and-contacts3": {
            title: {
                en: "Donations and Contacts3",
                it: "Donazioni e Contatti",
            }
        }
        
    } : {
        home: {
            title: {
                en: "Welcome",
                it: "Benvenuti",
            }
        },
        // president: {
        //     title: {
        //         en: 'President',
        //         it: 'Presidente'
        //     }
        // },
        // history: {
        //     title: {
        //         en: 'History',
        //         it: 'Storia'
        //     }
        // },
        council: {
            title: {
                en: "Foundation Board of Trustees",
                it: "Consiglio di Fondazione",
            }
        },
        "scientific-committee": {
            title: {
                en: "Scientific Council",
                it: "Consiglio Scientifico",
            }
        },
        donations: {
            title: {
                en: "Donations",
                it: "Donazioni",
            }
        },
        contact: {
            title: {
                en: "Contact",
                it: "Contatti",
            }
        }
    }
}

const home = {
    title: {
        en: "The IOR Foundation",
        it: "La Fondazione IOR",
    },
    content: {
        thanks: {
            en: 'Thank you for entering the website of the Foundation for the Institute of Oncology Research',
            it: 'Grazie per essere entrati nel sito della Fondazione per l’Istituto Oncologico di Ricerca.',
        },
        realities: {
            introduction: {
                it: 'La nostra Fondazione gestisce attualmente tre realtà diverse:',
                en: 'Our Foundation currently manages three separate activities:'
            },
            fior: {
                acronym: {
                    it: 'Fondazione IOR',
                    en: 'Foundation IOR'
                },
                title: {
                    it: 'La Fondazione per l\'Istituto oncologico di ricerca' ,
                    en: 'The Foundation for the Institute of Oncology Research'
                },
                address: {
                    en: '<b>The Foundation for the Institute of Oncology Research</b>',
                    it: '<b></b>'
                }
            },
            ior: {
                acronym: {
                    it: 'IOR',
                    en: 'IOR'
                },
                title: {
                    it: 'Istituto oncologico di ricerca' ,
                    en: 'Institute of Oncology Research'
                },
                description: {
                    it: 'Lo <b>IOR</b> ha iniziato la sua attività nel 2003 all’interno dell’edificio dell’Istituto di ricerca in biomedicina (IRB) di Bellinzona. In pochi anni i ricercatori dello IOR si sono affermati a livello internazionale, pubblicando ricerche di grande originalità e di notevole impatto nelle principali riviste scientifiche mondiali.<br/><br/>Inoltre questi ricercatori sono stati capaci di ottenere importanti contributi alla ricerca non solo dalle istanze nazionali svizzere, ma anche nell’ambito dei programmi molto selettivi dell’Unione Europea.<br/><br/>Questa qualità eccellente è stata riconosciuta dapprima dal Segretariato di Ricerca del Consiglio Federale (SEFRI), che ha accordato allo IOR i molto ambiti sussidi federali, ed in seguito dall’Università della Svizzera Italiana (USI), che ha affiliato lo IOR nel 2016 nell’ambito della Facoltà di Biomedicina appena creata.<br/><br/>A tutt’oggi (2018) quasi 70 persone lavorano nei laboratori dello IOR, con un budget annuale che si sta ormai avvicinando allo soglia del 10 milioni di franchi.',
                    en: 'The <b>IOR</b> (Institute of Oncology Research) started its activity in 2003 inside the building of the Institute for Research in Biomedicine  (IRB) in Bellinzona. In a few years, IOR researchers attained worldwide recognition through the publication of ground breaking research with a high impact in international leading scientific journals.<br/><br/>Furthermore the researchers were able to obtain important  financial contributions both in Switzerland and from the extremely selective European Union programmes.<br/><br/>This excellent quality level has been recognized first by the Research Secretariat of the Federal Council (SEFRI), which has granted to IOR the much sought-after federal subsides and later by the University of Southern Switzerland (USI), which affiliated the IOR in 2016 within the newly created Faculty of Biomedicine.<br/><br/>To date  (2018) almost 70 people work in the laboratories of the IOR with an annual budget that is approaching the threshold of 10 million francs.'
                },
                address: {
                    'en': '<b>Institute of Oncology Research IOR</b>', // <br/><br/>Via Vincenzo Vela 6<br/>CH-6500 Bellinzona<br/><br/>+41 91 820 0322',
                }
            },
            ielsg: {
                acronym: {
                    it: 'IELSG',
                    en: 'IELSG'
                },
                title: {
                    it: 'International Extranodal Lymphoma Study Group',
                    en: 'International Extranodal Lymphoma Study Group'
                },
                description: {
                    it: 'Lo <b>IELSG</b> è nato nel 1996, quando si è capito che i linfomi extranodali (che rappresentano circa il 40% di tutti i linfomi maligni) non possono essere studiati da singoli istituti, ma solo da un gruppo internazionale cooperativo, perché il loro decorso è grandemente dipendente dalla localizzazione primaria del linfoma.<br/><br/>Siccome questi linfomi possono insorgere praticamente in tutti gli organi del nostro corpo, le diverse forme (linfoma celebrale, testicolare, polmonare, etc.) sono relativamente rare, ragion per cui solo un grande gruppo coinvolgente molte istituzioni può occuparsi del problema.<br/><br/>IELSG ha avuto un enorme successo: attualmente, sotto il coordinamento del Prof. Emanuele Zucca e dell’ufficio operativo situato all’Istituto Oncologico della Svizzera Italiana (IOSI) di Bellinzona, quasi 300 istituzioni in 4 continenti partecipano a questi studi, che hanno generato anche una cinquantina di lavori scientifici pubblicati in riviste molto importanti.',
                    en: 'The <b>IELSG</b> was born in 1996, when it became clear that only an international research group rather than single institutions can study extranodal lymphoma (which represent approximately 40% of all malignant lymphoma), due to the fact that outcomes are largely dependent on the localization of the primary lymphoma.<br/><br/>As these lymphoma can originate in all organs of our body, the various forms (cerebral, testicular, pulmonary, etc.) are relatively rare, creating the necessity for a large study group involving many institutions.<br/><br/>IELSG has enjoyed an enormous success: currently, under the coordination of Prof. Emanuele Zucca and the operational office located at the Institute of Oncology of Southern Switzerland (IOSI) in Bellinzona, almost 300 institutions on 4 continents participate in these studies, which have also generated about fifty scientific papers published in leading journals.'
                },
                address: {
                    en: '<b>IELSG</b><br/><b>International Extranodal Lymphoma Study Group</b>', // <br/><br/>Ospedale San Giovanni<br/>CH-6500 Bellinzona<br/><br/>+41 91 811 9040<br/><br/><a href=\'mailto:ielsg@eoc.ch\'>ielsg@eoc.ch</a>',
                }
            },
            icml: {
                acronym: {
                    it: 'ICML',
                    en: 'ICML'
                },
                title: {
                    it: 'Conferenza Internazionale sui Linfomi Maligni',
                    en: 'International Conference on Malignant Lymphoma'
                },
                description: {
                    it: 'La <b>ICML</b> è stata organizzata per la prima volta nel 1981: dapprima ogni tre anni, dal 2011 ogni due anni. Questa conferenza è oramai diventata il convegno principale per tutti coloro che si occupano, a livello di ricerca o di trattamento di pazienti, di linfomi maligni.<br/><br/>Attualmente, per ragioni logistiche, siamo obbligati a limitare la partecipazione a non più di 3\'500 persone, anche se molte di più vorrebbero poter essere presenti.<br/><br/>È soprattutto grazie a ICML che il nome di Lugano è oramai conosciuto a livello mondiale nel settore della medicina, tant\'è vero che nella valutazione dei pazienti con questo tipo di tumore dappertutto si usa oggi la cosiddetta "Classificazione di Lugano".',
                    en: 'The <b>ICML</b> was organised for the first time in 1981: first every three years, since 2011 every two years. This conference has now become the main conference for all those involved in research or treatment of patients with malignant lymphoma.<br/><br/>Currently, for logistical reasons, we are obliged to limit the number of participants to 3\'500, although many more would like to attend.<br/><br/>It is mainly thanks to ICML that the name of Lugano is now known worldwide in the field of medicine, to such an extent that the " Lugano Classification" is universally used for the evaluation of patients with this type of cancer.'
                },
                address: {
                    en: '<b>International Conference on Malignant Lymphoma</b>', // <br/><br/>ICML Secretariat<br/>Via Vincenzo Vela 6<br/>CH-6500 Bellinzona<br/><br/>+41 (0)91 922 05 75'
                }
            },
        },
        finalThoughts: {
            it: 'Come vedete, la carne al fuoco è tanta. E sono sicuro che se proseguirete nella lettura di questo sito, anche voi sarete impressionati da quanto stiamo facendo.<br/>Personalmente ne sono molto orgoglioso.',
            en: 'As you can see there is a lot to take in and I am sure that as you continue reading this site, you will be impressed by all that we have accomplished.<br/></br/>Personally, I am very proud of our achievements.'
        },
        signature: {
            name: {
                it: 'Prof. Franco Cavalli',
                en: 'Prof. Franco Cavalli'
            },
            description: {
                it: 'Presidente della Fondazione per l\'Istituto oncologico di ricerca',
                en: 'President of the Foundation for the Institute of Oncology Research'
            }
        }
    },
    officialWebsite: {
        en: 'Official Website',
        it: 'Sito web ufficiale'
    }
}

const donations = {
    title: {
        en: 'Donations and contacts',
        it: 'Donazioni e contatti'
    },
    intro: {
        en: 'Possible both online as well as via bank transfer or on our post office account.<br/><br/>Thank you for your support!',
        it: 'Possibili sia online che tramite bonifico sul conto bancario o postale.<br/><br/>Grazie per il sostegno!'
    },
    creditCard: {
        title: {
            en: 'via Credit Card',
            it: 'via Carta di Credito'
        },
        confirmOrder: {
            en: 'Confirm order',
            it: 'Conferma ordine'
        },
        placeholders: {
            nameOnCard: {
                en: 'Name on the card',
                it: 'Nome sulla carta'
            },
            email: {
                en: 'E-mail address',
                it: 'Indirizzo E-mail'
            },
            amount: {
                en: 'Donation amount',
                it: 'Ammontare della donazione'
            }
        }
    },
    payPal: {
        title: {
            en: 'via PayPal',
            it: 'via PayPal'
        }
    },
    bankTransfer: {
        title: {
            en: 'via bank account',
            it: 'via conto bancario'
        },
        description: {
            en: 'Banca dello Stato del Canton Ticino<br/>Via Pioda 7<br/>6900 Lugano<br/>Switzerland<br/><br/><b>IBAN code:</b> CH31 0076 4336 9742 C000 C<br/><b>SWIFT:</b> BSCTCH22LUG<br/><b>Clearing number:</b> 00764',
            it: 'Banca dello Stato del Canton Ticino<br/>Via Pioda 7<br/>6900 Lugano<br/>Svizzera<br/><br/><b>Codice IBAN:</b> CH31 0076 4336 9742 C000 C<br/><b>SWIFT:</b> BSCTCH22LUG<br/><b>Clearing number:</b> 00764'
        }
    },
    post: {
        title: {
            en: 'via post account',
            it: 'via conto postale'
        },
        description: {
            en: 'PostFinance Ltd<br/>Mingerstrasse 20<br/>3030 Berna<br/>Switzerland<br/><br/><b>Post account nr.:</b> 65-433-5</br/><b>IBAN code:</b> CH91 0900 0000 6500 0433 5<br/><b>SWIFT:</b> POFICHBEXXX',
            it: 'PostFinance Ltd<br/>Mingerstrasse 20<br/>3030 Berna<br/>Svizzera<br/><br/><b>no. CCP:</b> 65-433-5</br/><b>IBAN code:</b> CH91 0900 0000 6500 0433 5<br/><b>SWIFT:</b> POFICHBEXXX'
        }
    }
}

const president = {
    title: {
        it: 'Professore Franco Cavalli, MD, FRCCP (Londra)',
        en: 'Professor Franco Cavalli, MD, FRCP (London)'
    },
    content: {
        en: 'Franco Cavalli, born in 1942, is Professor (titular professor) of medical oncology at the Faculty of Medicine in Bern, Switzerland.<br/><br/>In 1978 he created the Cantonal Oncology Service in Tessin which in 1999 became the Institute of Oncology of Southern Switzerland (IOSI) in Bellinzona, Canton Tessin (Switzerland), an institute which encompasses medical oncology, radio-oncology, nuclear medicine, palliative care, haematology and an important research division and of which he was scientific director of oncology until 2017.<br/><br/>Franco Cavalli has an international reputation for the treatment and research of malignant lymphoma and new drugs.<br/><br/>In 1981 he organized in Lugano the first edition of the International Conference on Malignant Lymphoma (ICML). Until 2011 it was held every three years, starting in 2011 once every two years. It has become the most important congress worldwide on malignant lymphoma.<br/><br/>In 1990 he was the founder and chief editor until the year 2000 of Annals of Oncology, the leading European journal of medical oncology.<br/><br/>In 1996 he founded the International Extranodal Lymphoma Study Group (IELSG), which now comprises more than 200 institutions on 4 continents. IELSG is the leading cooperative group in the field of biological and clinical studies regarding extranodal lymphomas.<br/><br/>He has also been very active in the field of clinical evaluation of new anticancer drugs. The quality of his work has been recognised with 24 national and international awards, including the Petzcoller Award for his special dedication to oncology and the ESMO Lifetime Achievement Award.<br/><br/>He is an honorary professor at the Universities of Tianjin (China), Biskek (Kyrgyzstan), Managua (Nicaragua) and Havana (Cuba).<br/><br/>He has published more than 600 articles in peer-reviewed journals and contributed to numerous books on cancer, including the Textbook of Medical Oncology, along with Stanley Kaye (London), Heine H. Hansen (Copenhagen) and James O. Armitage (Omaha, Nebraska) He is on the editorial board of several other journals.<br/><br/>Franco Cavalli was President of the Swiss Cancer League and is Chairman of the Scientific Committee of the European School of Oncology (ESO) and of the World Oncology Forum (WOF). He was President of the International Union Against Cancer (UICC) between 2006 and 2008. Since 2015, he has been a member of the WHO Committee for the selection of essential medicines for cancer.<br/><br/>He is currently president of the Foundation for the Institute of Oncology Research, based in Bellinzona, which manages the Institute of Oncology Research (IOR), the International Extranodal Lymphoma Study Group (IELSG) and the International Conference on Malignant Lymphoma (ICML).<br/><br/>Between 1995 and 2007 he was a member of the Swiss Parliament.',
        it: 'Franco Cavalli, nato nel 1942, è professore titolare di oncologia medica presso la Facoltà di Medicina di Berna, Svizzera.<br/><br/>Nel 1978 ha creato il Servizio oncologico cantonale ticinese, che nel 1999 è poi diventato l\'Istituto oncologico della Svizzera italiana (IOSI) a Bellinzona, Canton Ticino (Svizzera), un istituto che comprende l\'oncologia medica, la radiooncologia, la medicina nucleare, le cure palliative, l\'ematologia e un\'importante divisione di ricerca e di cui è stato direttore scientifico fino al 2017.<br/><br/>Franco Cavalli ha una reputazione internazionale per il trattamento e la ricerca sui linfomi maligni e sui nuovi farmaci.<br/><br/>Nel 1981 ha organizzato a Lugano la prima edizione della Conferenza Internazionale sui Linfomi Maligni (ICML). Fino al 2011 si è tenuta ogni tre anni, a partire dal 2011 a cadenza biennale. È diventato il congresso più importante a livello mondiale sui linfomi maligni.<br/><br/>Nel 1990 ha fondato Annals of Oncology, la principale rivista europea di oncologia medica, di cui è stato editore capo fino all\'anno 2000.<br/><br/>Nel 1996 ha fondato l\'International Extranodal Lymphoma Study Group (IELSG), che oggi comprende più di 200 istituzioni in 4 continenti. IELSG è il gruppo cooperativo leader nel campo degli studi biologici e clinici nel campo dei linfomi extranodali.<br/><br/>È stato molto attivo anche nel campo della valutazione clinica di nuovi farmaci antitumorali. La qualità del suo lavoro è stata riconosciuta con 24 premi nazionali ed internazionali, tra cui il Petzcoller Award per la particolare dedizione all\'oncologia e l\'ESMO Lifetime Achievement Award.<br/><br/>È professore onorario presso le Università di Tianjin (Cina), di Biskek (Kirghizistan), di Managua (Nicaragua) e dell\'Avana (Cuba).<br/><br/>Ha pubblicato più di 600 articoli su riviste specializzate e ha contribuito a numerosi libri sul cancro, tra cui il Textbook of Medical Oncology, assieme a Stanley Kaye (Londra), Heine H. Hansen (Copenhagen) e James O. Armitage (Omaha, Nebraska).<br/><br/>Fa parte del comitato editoriale di diverse altre riviste.<br/><br/>Franco Cavalli è stato presidente della Lega Svizzera Contro il Cancro ed è presidente del comitato scientifico dell\' European School of Oncology (ESO) e del World Oncology Forum (WOF). È stato Presidente dell\'Unione Internazionale Contro il Cancro (UICC) tra il 2006 e il 2008. Dal 2015 è membro del comitato dell\'OMS per la selezione dei farmaci essenziali per il cancro.<br/><br/>Attualmente è presidente della Fondazione per l\'Istituto oncologico di ricerca con sede a Bellinzona, la quale gestisce l\'Istituto oncologico di ricerca (IOR), l\'International Extranodal Lymphoma Study Group (IELSG) e l\'International Conference on Malignant Lymphoma (ICML).<br/><br/>Tra il 1995 e il 2007 è stato membro del Parlamento Svizzero.'
    }

}

const history = {
    title: {
        it: 'Storia della Fondazione',
        en: 'History of the Foundation'
    },
    content: {
        en: 'The Foundation was founded on 11.1.1999 as a Foundation for the Research and Treatment of Lymphoma in Tessin, mainly because the International Conference on Malignant Lymphoma in Lugano (ICML), from a humble beginning in 1981 had grown to such a size that it needed a legal and administrative body to continue to manage the event.<br/><br/>Slowly, the Foundation became associated with oncological research in Tessin, financing specific projects, principally in the field of malignant lymphoma. In particular, the Foundation played an important role in financing the development of the IELSG (International Extranodal Lymphoma Study Group) and also in supporting the database of the IOSI (Institute of Oncology of Southern Switzerland), a fundamental tool for identifying clinical research topics.<br/><br/>In 2011, the Foundation was obliged, for legal and administrative reasons, to take over the management of the research laboratories of the IOSI, situated in the building of the IRB (Institute of Research in Biomedicine) in Bellinzona, which from that moment on were renamed the Institute of Oncology Research (IOR).<br/><br/>This step was strongly advocated by the federal authorities, which in view of the high level of quality of the research, wanted to support the laboratories with federal subsidies. This however required the separation of the administration from that of the EOC (Ente Ospedaliero Cantonale) respectively of IOSI, to avoid the problem of federal funding to a cantonal institution.<br/><br/>This passage has also allowed a more flexible management of the IOR, which since then has had a very rapid development.<br/><br/>Since the management of the IOR has become the principal activity of the Foundation and so in order to create a parallel structure to that of the IRB, in 2018 it was decided to change the name of the Foundation, transforming it into "Foundation for the Institute of Oncology Research". This change was accepted by the Federal Institutions and the Foundation Control during 2018 and is now fully effective.',
        it: 'La Fondazione è nata l’11.1.1999 quale Fondazione per la Ricerca e la Cura dei Linfomi nel Ticino, principalmente perché la gestione della Conferenza Internazionale sui Linfomi Maligni a Lugano (ICML), che dal 1981 era ormai cresciuta a dismisura, necessitava di un contenitore legale ed amministrativo.<br/><br/>A poco a poco la Fondazione si è poi inserita nel panorama ticinese della ricerca oncologica finanziando progetti mirati, soprattutto nel settore dei linfomi maligni. In particolare ha avuto un ruolo importante nell’aiutare finanziariamente lo sviluppo dello IELSG (International Extranodal Lymphoma Study Group) ed anche nel sostenere il database dello IOSI (Istituto Oncologico della Svizzera Italiana), uno strumento fondamentale per permettere di individuare temi di ricerca clinici.<br/><br/>Nel 2011 la Fondazione ha dovuto riprendere per ragioni legali ed amministrativi la gestione dei laboratori di ricerca dello IOSI, situati nell’edificio IRB (Istituto di ricerca in biomedicina) a Bellinzona, che da quel momento sono stati ribattezzati Istituto Oncologico di Ricerca (IOR).<br/><br/>Questo passo era stato fortemente caldeggiato dalle autorità federali, che di fronte alla qualità dei lavori di ricerca portati avanti in questi laboratori, avevano deciso di sostenerli con dei sussidi federali. Questo sostegno richiedeva però lo scorporo dell’amministrazione da quella dell’EOC (Ente Ospedaliero Cantonale) e rispettivamente dello IOSI, per evitare il problema dei finanziamenti federali ad un istanza cantonale.<br/><br/>Questo passo ha permesso anche una gestione più elastica dello IOR, che da allora ha avuto uno sviluppo molto rapido.<br/><br/>Essendo diventata la gestione dello IOR l’attività principale della Fondazione e anche per avere una struttura parallela a quella dell’IRB, nel 2018 si decise di cambiare la denominazione della Fondazione, trasformandola in "Fondazione per l’Istituto oncologico di ricerca". Questo cambiamento è stato accettato nel corso del 2018 dalle Istanze Federali e dal Controllo delle Fondazioni ed è quindi ora pienamente effettivo.'
    }
}

const council = {
    title: {
        en: 'Foundation Board of Trustees',
        it: 'Consiglio di Fondazione'
    },
    boardOfDirectors: { 
        en: 'Board of directors', 
        it: 'Comitato direttivo' 
    },
    current: {
        en: 'Foundation Board of Trustees',
        it: 'Consiglio di fondazione'
    },
    previous: {
        en: 'Past members',
        it: 'Membri in passato'
    },
    scientific: {
        en: 'Scientific Council',
        it: 'Consiglio Scientifico'
    }
}


const contact = {
    title: {
        en: 'Contact',
        it: 'Contatto'
    },
    thanks: {
        en: 'Thanks for your submission!',
        it: 'Grazie per il messaggio!'
    },
    backToYou: {
        en: 'We will get back to you shortly.',
        it: 'Vi risponderemo al più presto'
    },
    pleaseFill: {
        en: 'Please fill out the form to contact us.',
        it: 'Riempia per favore il formulario per conttattarci.'
    },
    form: {
        en: 'Contact form',
        it: 'Formulario di contatto'
    },
    map: {
        en: 'Map',
        it: 'Dove trovarci'
    },
    send: {
        en: 'Send',
        it: 'Invia'
    },
    placeholders: {
        name: {
            en: 'Your name',
            it: 'Il suo nome'
        },
        email: {
            en: 'you@your-company.com',
            it: 'lei@la-sua-ditta.com'
        },
        message: {
            en: 'Your message ...',
            it: 'Il suo messaggio ...'
        }
    },
    labels: {
        name: {
            en: 'Name',
            it: 'Nome'
        },
        email: {
            en: 'E-mail address',
            it: 'Indirizzo E-mail'
        },
        message: {
            en: 'Message',
            it: 'Messaggio'
        }
    },
    address: {
        en: '<b>Fondazione per l’Istituto oncologico di ricerca (IOR)</b><br/><br/>Via Vincenzo Vela 6<br/>6500 Bellinzona<br/>Switzerland',
        it: '<b>Fondazione per l’Istituto oncologico di ricerca (IOR)</b><br/><br/>Via Vincenzo Vela 6<br/>6500 Bellinzona<br/>Svizzera',
    },
    details: {
        en: '<b>Ufficio del Presidente</b><br/>Ospedale San Giovanni<br/>CH-6500 Bellinzona<br/>Tel. +41 (0)91 811 86 66<br/>sarahjane.ortelligiannakis@eoc.ch<br/><br/><b>Segretaria della Fondazione</b><br/>Tel. +41 (0)91 921 45 61<br/>olga.jackson@lymphcon.ch',
    },
    detailsItem: {
        en: 'Contact details',
        it: 'Contatti'
    }
}

const scientificCommittee = {
    title: {
        en: 'Scientific Council',
        it: 'Consiglio Scientifico'
    }
}

const intro = {
    title: {
        en: 'Welcome',
        it: 'Benvenuti'
    }
}

const pages = {
    home,
    donations,
    president,
    history,
    council,
    contact,
    'scientific-committee': scientificCommittee,
    intro
};

const languages = {
    original: {
        en: 'English',
        it: 'Italiano',
        fr: 'Français',
        de: 'Deutsch',
        sp: 'Español'
    }
};

const navigation = {
    back: {
        en: 'BACK',
        it: 'INDIETRO'
    }
};

const assets = {
    logos: {
        foundation: {
            it: 'fondazione_ior.png',
            en: 'foundation_ior.png'
        },
        icml: {
            en: 'icml_logo.png'
        },
        ielsg: {
            en: 'ielsg.jpg'
        },
        ior: {
            en: 'IOR_logo.png'
        }

    }
}

export default {
    modal,
    assets,
    header,
    pages,
    languages,
    navigation
}