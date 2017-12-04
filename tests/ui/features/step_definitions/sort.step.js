/**
 * Created by cingouf on 04/12/17.
 */

const { Given, Then, When } = require('cucumber');
const assert = require('assert');

Given(/^The contact list is displayed$/, function(callback){
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

When(/^User clicks on sort button$/, function(callback){
    this.browser.visit("http://localhost:3000/", (err) => {
        this.browser.clickLink('#button_sort', (err) => {
            if(err) throw err;

            var tab = this.browser.queryAll("#contacts table tr");
            assert.equal(tab.length, 5);

            callback();
        });
    });
});

Then(/^The list is sorted$/, function(callback){
    this.browser.visit("http://localhost:3000/", (err) => {
        this.browser.clickLink('#button_sort', (err) => {
            if(err) throw err;

            var valid = true;
            var oldLastName="";
            var currentLastName = "";
            var contactTab = this.browser.queryAll("#contacts table tbody tr td#cellLastName");
            contactTab.forEach(function(item, i){
                currentLastName = item.innerHTML
                if(i > 1) {
                    if(currentLastName < oldLastName)
                        valid = false;
                }
                oldLastName = currentLastName;
            });

            assert(valid);

            callback();
        });
    });
});