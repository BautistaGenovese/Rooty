import React from "react";
import MethodLayout from "../../components/MethodLayout";

const Simpson38 = () => {
  return (
    <MethodLayout
      title="Regla de Simpson 3/8"
      endpoint="/api/integracion/simpson38"
      description="Método de integración numérica que aproxima la función mediante polinomios de tercer grado (cúbicas)."
      requiresInterval={true}
      requiresN={true}
      // TODO: Personaliza el MethodLayout si es necesario para agregar inputs extra
    />
  );
};

export default Simpson38;
