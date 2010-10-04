// ==========================================================================
// Project:   RouteSample - Tutorial Application showing how to move from
//            page to page.
// Copyright: ©2010 Vibul Imtarnasan (Veebs).
// License:   Licensed under MIT license (see license.js)
// ==========================================================================


// Page #1
RouteSample.onePage = SC.Page.design({

  onePane: SC.MainPane.design({
    childViews: 'labelView buttonView'.w(),
    
    labelView: SC.LabelView.design({
      layout: { top: 20, left: 27, width: 400, height: 20 },
      value: 'You are on page #1.',
      classNames: ['title1']
    }),

    buttonView: SC.ButtonView.design({
      layout: { top: 70, left: 27, width: 400 },
      title: 'Click to go to page #2.',
      action: 'go'
    }),
    
    go: function() {
      SC.routes.set('location', 'twoPage/twoPane');
    }
    
  })

});
