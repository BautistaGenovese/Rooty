import React from "react";
import MethodLayout from "../../components/MethodLayout";

const Simpson13 = () => {
  return (
    <MethodLayout
      title="Regla de Simpson 1/3"
      endpoint="/api/integracion/simpson13"
      description="Método de integración numérica que aproxima la función mediante polinomios de segundo grado (parábolas)."
      requiresInterval={true}
      requiresN={true}
      // TODO: Personaliza el MethodLayout si es necesario para agregar inputs extra
    />
  );
};

export default Simpson13;
