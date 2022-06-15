import { ADDITIONAL_OPTIONS, WAYPOINTS } from '../constData';
import { createElement } from '../render';

const createEventAddTemplate = (data, citiesList) =>
  `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${data.travel.waypoint.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
${WAYPOINTS.map((waypoint) => {
    const lowerWP = waypoint.toLowerCase();
    return `
    <div class="event__type-item">
      <input id="event-type-${lowerWP}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerWP}" ${
  waypoint === data.travel.waypoint ? 'checked' : ''
}>
      <label class="event__type-label  event__type-label--${lowerWP}" for="event-type-${lowerWP}-1">${waypoint}</label>
    </div>
`;
  })}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${data.travel.waypoint}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${
  data.city
}" list="destination-list-1">
        <datalist id="destination-list-1">
${Object.entries(citiesList)
    .map((entry) => `<option value="${entry[0]}"></option>`)
    .join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${new Date(
    data.travel.date.pure
  ).toLocaleDateString('en-US')} ${data.travel.time.start}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${new Date(
    data.travel.date.pure
  ).toLocaleDateString('en-US')} ${data.travel.time.end}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${
  data.price
}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
${ADDITIONAL_OPTIONS.map(
    (option) =>
      `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${option.id}-1" type="checkbox" name="event-offer-${option.id}">
      <label class="event__offer-label" for="event-offer-${option.id}-1">
        <span class="event__offer-title">${option.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${option.price}</span>
      </label>
    </div>`
  ).join('')} 
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
            ${citiesList[data.travel.city].description}
          </p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${citiesList[data.travel.city].photos.map(
    (photoUrl) => `
                  <img class="event__photo" src="${photoUrl}" alt="Event photo">
                `
  )}
            </div>  
          </div>
      </section>
    </section>
  </form>`;


export class EventAddTemplate {
  #initialData = null;
  #citiesList = null;
  #domElement = null;

  constructor (data, citiesList) {
    this.#initialData = data;
    this.#citiesList = citiesList;
  }

  get createElement () {
    if (this.#domElement === null) {
      this.#domElement = createElement(this.template);
    }
    return this.#domElement;
  }

  get template () {
    return createEventAddTemplate(this.#initialData, this.#citiesList)
  }

  removeElement () {
    this.#domElement = null;
  }
}
