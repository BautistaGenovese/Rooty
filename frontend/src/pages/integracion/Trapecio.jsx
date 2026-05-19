import React from "react";
import MethodLayout from "../../components/MethodLayout";

const Trapecio = () => {
  return (
    <MethodLayout
      title="Regla del Trapecio"
      endpoint="/api/integracion/trapecio"
      description="Método de integración numérica basado en aproximar la región bajo la gráfica de la función como un trapecio."
      requiresInterval={true}
      requiresN={true}
      // TODO: Personaliza el MethodLayout si es necesario para agregar inputs extra
    />
  );
};

export default Trapecio;
