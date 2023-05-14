class AgendaApp{
    api;
    agenda;

    constructor() {
        this.api = new API();
        this.api.getData().then(result => {
        this.agenda = new Agenda(result[0]);
        });

    }
}

class API{
    dataFromAPI = [];
    
   async getData() {
        await fetch("../data/data.json").then( response => {
            return response.json();
        }).then(data => {
            this.dataFromAPI = data.months;
        });
        return this.dataFromAPI;
    }
}

class Agenda{
    renderer;
    header;
    month;
    htmlElement;

    constructor(data) {
        this.htmlElement = document.createElement("article");
        this.htmlElement.classList.add("agenda");
        this.data = data;
        this.renderer = new Renderer();
        this.renderer.render("body",this.htmlElement);
        this.header = new Header(this, data.name);
        this.month = new Month(this, data.days);
    }

    render(placeToRender,whatToRender) {
        this.renderer.render(placeToRender, whatToRender);
    }
}

class Renderer{
    render(placeToRender, whatToRender) {
        document.querySelector(placeToRender).appendChild(whatToRender)
    }
}

class Header{
    nameOfMonth;
    htmlElement;
    agenda;
    leftButton;
    rightButton;

    constructor(agenda, nameOfMonth) {
        this.agenda = agenda;
        this.nameOfMonth = nameOfMonth;
        this.htmlElement = document.createElement("header");
        this.htmlElement.classList.add("agenda__header");
        this.leftButton = document.createElement("button");
        this.leftButton.innerText = "<";
        this.leftButton.classList =("agenda__button agenda__button--left");
        this.text = document.createElement("h2");
        this.text.innerText = this.nameOfMonth;
        this.rightButton = document.createElement("button");
        this.rightButton.innerText = ">";
        this.rightButton.classList =("agenda__button agenda__button--right");
        this.agenda.render(".agenda", this.htmlElement); // als je 2 agenda classes hebt pakt het de eerste

        this.agenda.render(".agenda__header", this.leftButton);
        this.agenda.render(".agenda__header", this.text);
        this.agenda.render(".agenda__header",this.rightButton);     
    }
}

class Month{
    days = [];
    agenda;
    numberOfDays;
    htmlElement;
    constructor(agenda, numberOfDays) {
        this.htmlElement = document.createElement("ul");
        this.htmlElement.classList.add("agenda__month");
        this.numberOfDays = numberOfDays;
        this.agenda = agenda;
        this.agenda.render(".agenda", this.htmlElement);
        for (let i = 1; i <= numberOfDays; i++){
            this.days.push(new Day(this, i));
        }
    }

    renderDays(placeToRender, whatToRender) {
        this.agenda.render(placeToRender, whatToRender);
    }
}

class Day{
    month;
    htmlElement;
    dayNumber;

    constructor(month,dayNumber) {
        this.dayNumber = dayNumber;
        this.htmlElement = document.createElement("li");
        this.htmlElement.classList.add("agenda__day");
        this.htmlElement.innerText = this.dayNumber;
        this.month = month;
        this.month.renderDays(".agenda__month", this.htmlElement);
    }
}

const UdayZijnAgenda = new AgendaApp();
console.log(UdayZijnAgenda);


//video 6


//class header : 

// this.htmlElement.innerText = this.nameOfMonth;       //waarom niet :  this.htmlElement.innerText = nameOfMonth; ?