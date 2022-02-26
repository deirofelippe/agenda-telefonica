import React from "react";
import { Route, Switch } from "react-router-dom";
import Contact from "./components/Contact";
import ContactEdit from "./components/ContactEdit";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

const Rotas = () => {
   return (
      <>
         <Switch>
            <Route exact path={["/", "/contact"]} component={ContactList} />
            <Route path="/contact/edit/:id" component={ContactEdit} />
            <Route path="/contact/form" component={ContactForm} />
            <Route path="/contact/:id" component={Contact} />
         </Switch>
      </>
   );
};

export default Rotas;
