import DocViewer, { DocViewerRenderers } from '../DocViewer';

const PdfView = () => {
  return (
		<div style={{height: '99vh'}}>
    <DocViewer
			documents={[
				{ uri: require("../_example-files_/pdf.pdf"), fileName: 'ABC' }, // Local File
				{ uri: require("../_example-files_/sample.pdf") }, // Local File

			]}
			pluginRenderers={DocViewerRenderers}
			config={{header: {
				// disableFileName: true,
				// disableDocumentNav: true,
				// paginated: true,
				// downloadable: false,
			}}}
			theme={{
				tertiary: '#fff',
			}}
    />
		</div>
  );
}

export default PdfView;
