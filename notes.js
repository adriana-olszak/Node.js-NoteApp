"use strict";

const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);

        return note;
    }

};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();

    return notes.filter((note) => note.title === title)[0];
};

var removeNote = (title) => {
    var notes, filteredNotes;

    notes = fetchNotes();
    filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;

};


var logNote = (data) => {
    if (typeof data.note !== 'undefined') {
        console.log(data.successMsg);
        console.log("--");
        console.log(`Title: \n ${data.note.title}`);
        console.log(`Body:  \n ${data.note.body}`);
    } else {
        console.log(data.errorMsg);
    }
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};
