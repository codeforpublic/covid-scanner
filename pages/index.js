import dynamic from 'next/dynamic'

const ScannerPage = dynamic(() => import('../src/ScannerPage'), {
  ssr: false
})
const IndexPage = () => {
  return <ScannerPage />
}
export default IndexPage
