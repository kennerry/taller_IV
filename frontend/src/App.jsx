import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Table,
  Badge,
  Spinner,
  Alert
} from 'reactstrap';
import './App.css';

function App() {
  // Estados para almacenar los datos recibidos del Backend
  const [healthMessage, setHealthMessage] = useState('');
  const [teamInfo, setTeamInfo] = useState([]);
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para consumir ambos endpoints de Express
    const fetchData = async () => {
      try {
        setLoading(true);

        // Consumo de Endpoint 4: /api/health
        const healthRes = await fetch('http://localhost:3005/api/health');
        if (!healthRes.ok) throw new Error('Error al consultar /api/health');
        const healthData = await healthRes.json();
        setHealthMessage(healthData.message);

        // Consumo de Endpoint 5: /api/info
        const infoRes = await fetch('http://localhost:3005/api/info');
        if (!infoRes.ok) throw new Error('Error al consultar /api/info');
        const infoData = await infoRes.json();
        setInfoMessage(infoData.message);
        setTeamInfo(infoData.integrantes);

      } catch (err) {
        console.error(err);
        setError('No se pudo conectar con el servidor Backend. Verifica que esté corriendo en el puerto 3005.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="my-5">
      {/* Punto 3: Título Taller IV */}
      <h1 className="text-center mb-4">Taller IV</h1>

      {error && <Alert color="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center my-5">
          <Spinner color="primary" />
          <p className="mt-2">Cargando datos desde la API...</p>
        </div>
      ) : (
        <>
          {/* Punto 4: Sección de Estado de la API usando <section>, <div>, <h4>, <p> y CSS */}
          <section className="health-section">
            <div className="health-content">
              <h4>Estado del Servidor</h4>
              <div className="health-status-box">
                <p className="health-status-text">
                  {healthMessage || 'Sin respuesta del servicio'}
                </p>
              </div>
            </div>
          </section>

          {/* Punto 5: Sección con componentes de Reactstrap para mostrar integrantes */}
          <Card className="shadow-sm">
            <CardHeader tag="h5" className="bg-primary text-white d-flex justify-content-between align-items-center">
              <span>Información de Integrantes</span>
              <Badge color="light" className="text-dark">
                {infoMessage}
              </Badge>
            </CardHeader>
            <CardBody>
              {/* Se retiró 'striped' para evitar fondos alternados */}
              <Table responsive hover className="mb-0">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Carrera</th>
                    <th className="text-center">Materias Aprobadas</th>
                  </tr>
                </thead>
                <tbody>
                  {teamInfo.map((integrante, index) => (
                    <tr key={index}>
                      {/* Se retiró 'fw-bold' para mantener el peso de fuente estándar */}
                      <td>{integrante.nombre}</td>
                      <td>{integrante.edad} años</td>
                      <td>{integrante.carrera}</td>
                      <td className="text-center">
                        <Badge color="success" pill>
                          {integrante.materiasAprobadas}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </>
      )}
    </Container>
  );
}

export default App;
