"use strict";

const fs = require('fs');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
        describe: 'Title of note',
        demand: true,
        alias: 't'
};

var argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: {
            describe: 'Body of note',
            demand: true,
            alias: 'b'
        }
    })
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .command('list', 'List all notes')
    .help()
    .argv;
var command = process.argv[2];

if (command === 'add') {
    let note = notes.addNote(argv.title, argv.body);

    notes.logNote({note, successMsg: "Your note has been created:", errorMsg: "Note title taken."});


} else if (command === 'list') {
    var allNotes = notes.getAll();

    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote({note, successMsg: "Your note:", errorMsg: "Notes does not exists."}));


} else if (command === 'read') {
    let note = notes.getNote(argv.title);

    notes.logNote({note, successMsg: "Your note:", errorMsg: "Note does not exists."});


} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);

    var message = noteRemoved ? `Note ${argv.title} was removed` : `Note ${argv.title} not found!`;
    console.log(message);


} else {
    console.log("Command not recognized");
}