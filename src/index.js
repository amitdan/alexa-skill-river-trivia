'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.b074ba3c-98bb-43d7-bdd2-5f8fa94c8b49";

function getSpeechDescription(item)
{
    let sentence = item.RiverName + " is the " + item.RankBasedOnLengthInMiles + "th longest river based on length,  It originates from " + item.OriginatesFrom + ", and ends in " + item.EndsIn + ". The Length in kilometer is " + item.LengthInMiles + ", and Benefitted Countries Or States are " + item.BenefittedCountriesOrStates + ". Which other river would you like to know about?";
    return sentence;
}

function getQuestion(counter, property, item)
{       
    switch(property)
    {
        case "RankBasedOnLengthInMiles":
            return "Here is your " + counter + "th question.  What is the rank based on length in kilometers of " + item.RiverName + " ?";
        break;
        case "OriginatesFrom":
            return "Here is your " + counter + "th question.  From where did " + item.RiverName + " River originate ?";
        break;
        case "EndsIn":
            return "Here is your " + counter + "th question.  Where does " + item.RiverName + " River end ?";
        break;
		case "LengthInMiles":
            return "Here is your " + counter + "th question.  What is the length in kilometers of " + item.RiverName + " River ?";
        break;
		case "BenefittedCountriesOrStates":
            return "Here is your " + counter + "th question.  Which are the benefitted countries or states from " + item.RiverName + " River ?";
        break;
        default:
            return "Here is your " + counter + "th question.  What is the " + formatCasing(property) + " of "  + item.RiverName + "?";
        break;
    }
    
}

function getAnswer(property, item)
{
    switch(property)
    {
        case "RankBasedOnLengthInMiles":
            return "The rank based on length in kilometers of " + item.RiverName + " is <say-as interpret-as='spell-out'>" + item[property] + "</say-as>. "
        break;
		case "OriginatesFrom":
            return item.RiverName + " river originates from <say-as interpret-as='spell-out'>" + item[property] + "</say-as>. "
        break;
		case "EndsIn":
            return item.RiverName + " river ends in <say-as interpret-as='spell-out'>" + item[property] + "</say-as>. "
        break;
		case "LengthInMiles":
            return "The length in kilometers of " + item.RiverName + " is <say-as interpret-as='spell-out'>" + item[property] + "</say-as>. "
        break;
		case "BenefittedCountriesOrStates":
            return "The benefitted countries or states from " + item.RiverName + " are <say-as interpret-as='spell-out'>" + item[property] + "</say-as>. "
        break;
        default:
            return "The " + formatCasing(property) + " of " + item.RiverName + " is " + item[property] + ". "
        break;
    }
}

const speechConsCorrect = ["Booya", "All righty", "Bam", "Bazinga", "Bingo", "Boom", "Bravo", "Cha Ching", "Cheers", "Dynomite",
"Hip hip hooray", "Hurrah", "Hurray", "Huzzah", "Oh dear.  Just kidding.  Hurray", "Kaboom", "Kaching", "Oh snap", "Phew",
"Righto", "Way to go", "Well done", "Whee", "Woo hoo", "Yay", "Wowza", "Yowsa"];

const speechConsWrong = ["Argh", "Aw man", "Blarg", "Blast", "Boo", "Bummer", "Darn", "D'oh", "Dun dun dun", "Eek", "Honk", "Le sigh",
"Mamma mia", "Oh boy", "Oh dear", "Oof", "Ouch", "Ruh roh", "Shucks", "Uh oh", "Wah wah", "Whoops a daisy", "Yikes"];

const WELCOME_MESSAGE = "Welcome to the River Game!  You can ask me about any of the rivers and their details, or you can ask me to start a quiz.  What would you like to do?";

const START_QUIZ_MESSAGE = "OK.  I will ask you 10 questions about the Rivers in India.";

const EXIT_SKILL_MESSAGE = "Thank you for playing the River Game!  Let's play again soon!";

const REPROMPT_SPEECH = "Which other river and their details would you like to know about?";

const HELP_MESSAGE = "I know lots of things about the India.  You can ask me about river and their details, and I'll tell you what I know.  You can also test your knowledge by asking me to start a quiz.  What would you like to do?";

function getBadAnswer(item) { return "I'm sorry. " + item + " is not something I know very much about in this skill. " + HELP_MESSAGE; }

function getCurrentScore(score, counter) { return "Your current score is " + score + " out of " + counter + ". "; }

function getFinalScore(score, counter) { return "Your final score is " + score + " out of " + counter + ". "; }

const USE_CARDS_FLAG = false;

function getCardTitle(item) { return item.RiverName;}

function getSmallImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/720x400/" + item.Abbreviation + "._TTH_.png"; }

function getLargeImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1200x800/" + item.Abbreviation + "._TTH_.png"; }

const data = [
{RankBasedOnLengthInMiles: 1, RiverName: "Indus",  OriginatesFrom: "In Tibet Kalish Range 5080 mts", EndsIn: "Arabian sea", LengthInMiles: 2900, BenefittedCountriesOrStates: "India and Pakistan"},
{RankBasedOnLengthInMiles: 2, RiverName: "Brahmaputra",  OriginatesFrom: "Lake Manasarovar", EndsIn: "Bay of Bengal River", LengthInMiles: 2900, BenefittedCountriesOrStates: "North Eastern state"},
{RankBasedOnLengthInMiles: 3, RiverName: "Ganga",  OriginatesFrom: "Gangothri", EndsIn: "Bay of Bengal", LengthInMiles: 2510, BenefittedCountriesOrStates: "Uttar Pradesh, Uttarakhand, Bihar, West Bengal"},
{RankBasedOnLengthInMiles: 4, RiverName: "Godavari",  OriginatesFrom: "Nasik Hills", EndsIn: "Bay of Bengal", LengthInMiles: 1450, BenefittedCountriesOrStates: "South-easterly part of Andhra Pradesh"},
{RankBasedOnLengthInMiles: 5, RiverName: "Narmada",  OriginatesFrom: "Amarkantak hill in Madhya Pradesh", EndsIn: "Arabian sea", LengthInMiles: 1290, BenefittedCountriesOrStates: "Madhya Pradesh and Maharashtra"},
{RankBasedOnLengthInMiles: 6, RiverName: "Krishna",  OriginatesFrom: "Near Mahabaleshwar in Maharashtra", EndsIn: "Bay of Bengal", LengthInMiles: 1290, BenefittedCountriesOrStates: "Maharastra and Andhrapradesh"},
{RankBasedOnLengthInMiles: 7, RiverName: "Yamuna",  OriginatesFrom: "Garhwall in Yamunotri", EndsIn: "Bay of Bengal", LengthInMiles: 1211, BenefittedCountriesOrStates: "Delhi, Haryana and UP"},
{RankBasedOnLengthInMiles: 8, RiverName: "Mahanadi",  OriginatesFrom: "Amarkantak Plateau", EndsIn: "Bay of Bengal", LengthInMiles: 890, BenefittedCountriesOrStates: "Jharkhand, Chhattisgarh, Orissa"},
{RankBasedOnLengthInMiles: 9, RiverName: "Kaveri",  OriginatesFrom: "Hills of Coorg, Karnataka", EndsIn: "Bay of Bengal", LengthInMiles: 760, BenefittedCountriesOrStates: "Karnataka and Tamilnadu"},
{RankBasedOnLengthInMiles: 10, RiverName: "Tapi",  OriginatesFrom: "Bettul", EndsIn: "Arabian sea", LengthInMiles: 724, BenefittedCountriesOrStates: "Madhya Pradesh and Maharashtra"}
            ];

const counter = 0;

const states = {
    START: "_START",
    QUIZ: "_QUIZ"
};

const handlers = {
     "LaunchRequest": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
     },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AnswerIntent": function() {
        this.handler.state = states.START;
        this.emitWithState("AnswerIntent");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    }
};

const startHandlers = Alexa.CreateStateHandler(states.START,{
    "Start": function() {
        this.response.speak(WELCOME_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "AnswerIntent": function() {
        let item = getItem(this.event.request.intent.slots);

        if (item && item[Object.getOwnPropertyNames(data[0])[0]] != undefined)
        {
          console.log("\nMEMO's TEST\n");
            if (USE_CARDS_FLAG)
            {
                let imageObj = {smallImageUrl: getSmallImage(item), largeImageUrl: getLargeImage(item)};

                this.response.speak(getSpeechDescription(item)).listen(REPROMPT_SPEECH);
                this.response.cardRenderer(getCardTitle(item), getTextDescription(item), imageObj);            }
            else
            {
                this.response.speak(getSpeechDescription(item)).listen(REPROMPT_SPEECH);
            }
        }
        else
        {
            this.response.speak(getBadAnswer(item)).listen(getBadAnswer(item));

        }

        this.emit(":responseReady");
    },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AMAZON.PauseIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.emitWithState("Start");
    }
});


const quizHandlers = Alexa.CreateStateHandler(states.QUIZ,{
    "Quiz": function() {
        this.attributes["response"] = "";
        this.attributes["counter"] = 0;
        this.attributes["quizscore"] = 0;
        this.emitWithState("AskQuestion");
    },
    "AskQuestion": function() {
        if (this.attributes["counter"] == 0)
        {
            this.attributes["response"] = START_QUIZ_MESSAGE + " ";
        }

        let random = getRandom(0, data.length-1);
        let item = data[random];

        let propertyArray = Object.getOwnPropertyNames(item);
        let property = propertyArray[getRandom(1, propertyArray.length-1)];

        this.attributes["quizitem"] = item;
        this.attributes["quizproperty"] = property;
        this.attributes["counter"]++;

        let question = getQuestion(this.attributes["counter"], property, item);
        let speech = this.attributes["response"] + question;

        this.emit(":ask", speech, question);
    },
    "AnswerIntent": function() {
        let response = "";
        let speechOutput = "";
        let item = this.attributes["quizitem"];
        let property = this.attributes["quizproperty"]

        let correct = compareSlots(this.event.request.intent.slots, item[property]);

        if (correct)
        {
            response = getSpeechCon(true);
            this.attributes["quizscore"]++;
        }
        else
        {
            response = getSpeechCon(false);
        }

        response += getAnswer(property, item);

        if (this.attributes["counter"] < 10)
        {
            response += getCurrentScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.attributes["response"] = response;
            this.emitWithState("AskQuestion");
        }
        else
        {
            response += getFinalScore(this.attributes["quizscore"], this.attributes["counter"]);
            speechOutput = response + " " + EXIT_SKILL_MESSAGE;

            this.response.speak(speechOutput);
            this.emit(":responseReady");
        }
    },
    "AMAZON.RepeatIntent": function() {
        let question = getQuestion(this.attributes["counter"], this.attributes["quizproperty"], this.attributes["quizitem"]);
        this.response.speak(question).listen(question);
        this.emit(":responseReady");
    },
    "AMAZON.StartOverIntent": function() {
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.PauseIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.emitWithState("AnswerIntent");
    }
});

function compareSlots(slots, value)
{
    for (let slot in slots)
    {
        if (slots[slot].value != undefined)
        {
            if (slots[slot].value.toString().toLowerCase() == value.toString().toLowerCase())
            {
                return true;
            }
        }
    }
    return false;
}

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}

function getRandomSymbolSpeech(symbol)
{
    return "<say-as interpret-as='spell-out'>" + symbol + "</say-as>";
}

function getItem(slots)
{
    let propertyArray = Object.getOwnPropertyNames(data[0]);
    let value;

    for (let slot in slots)
    {
        if (slots[slot].value !== undefined)
        {
            value = slots[slot].value;
            for (let property in propertyArray)
            {
                let item = data.filter(x => x[propertyArray[property]].toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
                if (item.length > 0)
                {
                    return item[0];
                }
            }
        }
    }
    return value;
}

function getSpeechCon(type)
{
    let speechCon = "";
    if (type) return "<say-as interpret-as='interjection'>" + speechConsCorrect[getRandom(0, speechConsCorrect.length-1)] + "! </say-as><break strength='strong'/>";
    else return "<say-as interpret-as='interjection'>" + speechConsWrong[getRandom(0, speechConsWrong.length-1)] + " </say-as><break strength='strong'/>";
}

function formatCasing(key)
{
    key = key.split(/(?=[A-Z])/).join(" ");
    return key;
}

function getTextDescription(item)
{
    let text = "";

    for (let key in item)
    {
        text += formatCasing(key) + ": " + item[key] + "\n";
    }
    return text;
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers, startHandlers, quizHandlers);
    alexa.execute();
};