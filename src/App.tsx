// @ts-ignore
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry"
import { pdfjs } from 'react-pdf'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import {
	PdfView,
	MultipleDocs,
} from './example'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const App = () => {
	const navigate = useNavigate()

	return (
		<div style={{height: '99vh'}}>
			<div style={{height: '99vh'}}>
				<PdfView />
			</div>
		</div>
  );
}

export default App;
