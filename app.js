window.addEventListener('load', solve);

function solve() {

   const firstNameElement = document.querySelector('#first-name')
   const lastNameElement = document.querySelector('#last-name')
   const numberOfPeopleElement = document.querySelector('#people-count')
   const fromDateElement = document.querySelector('#from-date')
   const daysCountElement = document.querySelector('#days-count')
   const arrayOfInputs = [firstNameElement, lastNameElement, numberOfPeopleElement, fromDateElement, daysCountElement];

   const nextStepButton = document.querySelector('#next-btn');
   const ticketElement = document.querySelector('.ticket-info-list');
   const confirmTicketElement = document.querySelector('.confirm-ticket');
   const mainElement = document.querySelector('#main');


   nextStepButton.addEventListener('click', onNext);

   function onNext(event) {
      event.preventDefault();

      for (const input of arrayOfInputs) {
         if (input.value == '') {
            return
         }
      }

      const firstName = firstNameElement.value;
      const lastName = lastNameElement.value;
      const numberOfPeople = numberOfPeopleElement.value;
      const fromDate = fromDateElement.value;
      const daysCount = daysCountElement.value;

      const li = factoryAndAppend('li', false, false, 'ticket');
      const article = factoryAndAppend('article', false, li);
      factoryAndAppend('h3', `Name: ${firstNameElement.value} ${lastNameElement.value}`, article);
      factoryAndAppend('p', `From date: ${fromDateElement.value}`, article);
      factoryAndAppend('p', `For ${daysCountElement.value} days`, article);
      factoryAndAppend('p', `For ${numberOfPeopleElement.value} people`, article);
      const editBtn = factoryAndAppend('button', 'Edit', li, 'edit-btn');
      const continueBtn = factoryAndAppend('button', 'Continue', li, 'continue-btn');

      ticketElement.appendChild(li);

      arrayOfInputs.forEach(x => x.value = '');
      nextStepButton.disabled = true;

      editBtn.addEventListener('click', onEdit);
      continueBtn.addEventListener('click', onContinue);

      function onEdit() {
         firstNameElement.value = firstName;
         lastNameElement.value = lastName;
         numberOfPeopleElement.value = numberOfPeople;
         fromDateElement.value = fromDate;
         daysCountElement.value = daysCount;

         li.remove();
         nextStepButton.disabled = false;
      }

      function onContinue() {
         editBtn.remove();
         continueBtn.remove();

         const confirmBtn = factoryAndAppend('button', 'Confirm', li, 'confirm-btn');
         const cancelBtn = factoryAndAppend('button', 'Cancel', li, 'cancel-btn');

         confirmTicketElement.appendChild(li);

         confirmBtn.addEventListener('click', onConfirm);
         cancelBtn.addEventListener('click', onCancel);
      }

      function onCancel() {
         li.remove();
         nextStepButton.disabled = false;
      }

      function onConfirm() {
         mainElement.innerHTML = '';
         const h1 = document.createElement('h1');
         h1.textContent = 'Thank you, have a nice day!';
         h1.id = 'thank-you';
         mainElement.appendChild(h1);

         const backButton = document.createElement('button');
         backButton.textContent = 'Back';
         backButton.id = 'back-btn';
         backButton.onClick = 'reload';
         backButton.addEventListener('click', onBack);
         mainElement.appendChild(backButton)
      }

      function onBack() {
         location.reload()
      }
   }

   function factoryAndAppend(el, text, appendTo, nameOfTheClass) {
      const element = document.createElement(el);
      if (text) {
         element.textContent = text;
      }
      if (nameOfTheClass) {
         element.className = nameOfTheClass;
      }
      if (appendTo) {
         appendTo.appendChild(element);
      }
      return element;
   }
}

