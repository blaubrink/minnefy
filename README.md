# Minnefy

Minnefy aims to create a minnesong from a text input. It uses the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) to turn text into speech.

The text input is analyzed and translated from German to Middle High German. Words that are not part of the current dictionary will remain the same. Please note: Punctuation marks currently prevent words from being recognized and translated.

The Web Speech API allows to access several voices of different languages. The actual selection can change depending on the browser and the operating system.

Different moods can be selected that change the background music, but also the pitch, rate and volume for each individual line of the text input. The selection can be extended by more moods, but also by different background tracks and melodies for the existing moods, so they can either be chosen at random or depending on certain atrributes of the text input (e.g. number of lines, characters per line, syllables or certain keywords).

The melodies are implemented as arrays with pitch, rate and volume values for each line and are easily adjustable. A melody will loop, if there are more lines of text input than in the selected melody array. Furthermore, the dictionary for Middle High Germans can easily be extended. For the future, it would also be possible to outsource melodies and the dictionary to external sheets and import them (e.g. via [Papa Parse](https://www.papaparse.com/)) to make it easier to edit or add values.