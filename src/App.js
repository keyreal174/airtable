import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Table,
  Spinner
} from "react-bootstrap";
import Airtable from 'airtable';
import { getRecords, setLoading } from "./action";
import "./App.css"

const api_key = "keyr4dEc0VWx0izmh";
const base = new Airtable({ apiKey: api_key }).base('app5UOoTvlSs4GKCa');

const App = () => {
  const dispatch = useDispatch();
  const { records, sum, totalCount, totalCancelledNoise, loading } = useSelector((state) => state);
  // const [sum, setSum] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(setLoading(true));
        base('Feature Analysis').select({view: 'Grid view'}).all().then(records => {
          let total = 0;
          const data = records.map((record, index) => {
            total += record.fields.Price;
            return {
              Headphone: record.fields['Headphone'],
              Competitor: record.fields['Competitor Information'],
              Biometric: record.fields['Biometric'] ? "True" : "False",
              Model: record.fields['Model'],
              Noise: record.fields['Noise Cancelling'] ? "True" : "False",
              Price: `$${record.fields['Price']}`,
              Stereo: record.fields['Stereo'] ? "True" : "False",
              Website: record.fields['Website'],
              Microphones: record.fields['Microphones'] ? "True" : "False",
              Controls: record.fields['Controls'] ? "True" : "False",
              Wireless: record.fields['Wireless'] ? "True" : "False"
            }
          });
          dispatch(getRecords({
            records: data,
            sum: total,
            totalCount: data.length,
            totalCancelledNoise: (data.filter((record) => record.Noise === "False")).length
          }));
          dispatch(setLoading(false));
        });
      } catch (error) {
        dispatch(setLoading(false));
      }
    }

    fetch();
  }, []);

  return (
    <div className="App">
      <Container>
        <div className="airtable-summary d-flex align-items-center">
          <div className="airtable-summary__item">
            <p>Total Headphone</p>
            <p>{totalCount}</p>
          </div>
          <div className="airtable-summary__item">
            <p>Total Headphone Costs</p>
            <p>${sum}</p>
          </div>
          <div className="airtable-summary__item">
            <p>Total Noise Cancelling</p>
            <p>{totalCancelledNoise}</p>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>NO</th>
              <th>Headphone</th>
              <th>Competitor Information</th>
              <th>Biometric</th>
              <th>Controls</th>
              <th>Microphones</th>
              <th>Model</th>
              <th>Noise Cancelling</th>
              <th>Price</th>
              <th>Stereo</th>
              <th>Website</th>
              <th>Wireless</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.Headphone}</td>
                <td>{record.Competitor}</td>
                <td>{record.Biometric}</td>
                <td>{record.Controls}</td>
                <td>{record.Microphones}</td>
                <td>{record.Model}</td>
                <td>{record.Noise}</td>
                <td style={{ width: 100 }}>{record.Price}</td>
                <td>{record.Stereo}</td>
                <td>{record.Website}</td>
                <td>{record.Wireless}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {loading && (
          <div className="spinner-wrapper">
            <Spinner animation="border" variant="danger" />
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
