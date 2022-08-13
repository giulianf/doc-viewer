// @ts-ignore
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry"
import { pdfjs } from 'react-pdf'
import { BrowserRouter as Router, useParams, useLocation } from 'react-router-dom'
import {
	PdfView,
	MultipleDocs,
} from './example'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const App = () => {

	return (
		<Router>
			<div style={{height: '99vh'}}>
				<div style={{height: '99vh'}}>
					<PdfView />
				</div>
			</div>
		</Router>
  );
}

export default App;
