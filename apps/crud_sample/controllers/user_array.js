// ==========================================================================
// Project:   CrudSample - Tutorial Application on CRUD operations
// Copyright: ©2010 Vibul Imtarnasan (Veebs).
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/** @class

  Controller for an array of user records

 @extends SC.Object
 */
CrudSample.userRecordArrayController = SC.ArrayController.create(SC.CollectionViewDelegate, {

  /**
   * Only allow 1 row to be selected at anyone time.
   * SC.CollectionView looks for this variable in it's content (which is this array)
   */
  allowsMultipleSelection: NO,

  /**
   * Allows this controller to properly respond to ListView delete
   * See http://wiki.sproutcore.com/Todos+05-Finishing+the+UI
   * @param view View calling the delete
   * @param content
   * @param indexes Indexes of the item to be deleted
   */
  collectionViewDeleteContent: function(view, content, indexes) {
    // destroy the records
    var records = indexes.map(function(idx) {
      return this.objectAt(idx);
    }, this);
    records.invoke('destroy');

    var selIndex = indexes.get('min') - 1;
    if (selIndex < 0) {
      selIndex = 0;
    }
    this.selectObject(this.objectAt(selIndex));
  },

  /**
   * Adds a new user and prepares it for editing
   */
  add: function() {
    // Create a new task in the store
    var newUser = CrudSample.store.createRecord(CrudSample.UserRecord);

    // Make the new user the currently selected record in our store so we can edit it
    this.selectObject(newUser);

    return;
  },

  /**
   * Denotes if the data source is ready
   */
  isReady: function() {
    var status = this.get('status');
    return status & SC.Record.READY;
  }.property('status').cacheable(),

  /**
   * Provides a summary of the status of the controller.
   */
  summary: function() {
    var ret = '';

    var status = this.get('status');
    if (status & SC.Record.READY) {
      var len = this.get('length');
      if (len && len > 0) {
        ret = len === 1 ? "1 user" : "%@ users".fmt(len);
      } else {
        ret = "No users";
      }
    }
    if (status & SC.Record.BUSY) {
      ret = "Loading..."
    }
    if (status & SC.Record.ERROR) {
      ret = "Error"
    }

    return ret;
  }.property('length', 'status').cacheable()

});
