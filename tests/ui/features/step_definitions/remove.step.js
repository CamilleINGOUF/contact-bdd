/**
 * Created by cingouf on 04/12/17.
 */

const { Given, Then, When } = require('cucumber');
const assert = require('assert');

Given(/^The contact list is display$/, function(callback){
    this.browser.visit("http://localhost:3000/", (err) => {
        if(err) throw err;
        this.browser.assert.text('h1', 'Contacts');

        var header = this.browser.queryAll("#contacts table tr:first-child th");
        var values = ["First name","Last name","Phones","Mails","Tags","Actions"];
        header.forEach(function(item){
            assert(values.indexOf(item.innerHTML) >= 0);
        });

        callback();
    });
});

When(/^User clicks on remove button of the first contact$/, function(callback){
   this.browser.visit("http://localhost:3000/", (err) => {
       this.browser.clickLink('#contacts tr:nth-child(2) td a', (err) => {
           if(err) throw err;

           var tab = this.browser.queryAll("#contacts table tr");
           assert.equal(tab.length, 4);

           callback();
       });
   });
});

Then(/^The first contact is removed$/, function(callback){
    this.browser.visit("http://localhost:3000/", (err) => {
        this.browser.clickLink('#contacts tr:nth-child(2) td a', (err) => {
            if (err) throw err;

            var tab = this.browser.query("#contacts table tr td");
            assert.notEqual(tab.innerHTML, 'Eric');

            callback();
        });
    });
});