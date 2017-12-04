/**
 * Created by cingouf on 04/12/17.
 */

const { Given, Then, When } = require('cucumber');
const assert = require('assert');

Given(/^The contact list is display$/, function(callback){
    callback.pending();

});

When(/^User clicks on sort button$/, function(callback){
    callback.pending();
});

Then(/^The list is sorted$/, function(callback){
    callback.pending();

});