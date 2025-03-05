interface PaginationInfoProps {
  startItem: number
  endItem: number
  totalItems: number
}

export const PaginationInfo = ({ startItem, endItem, totalItems }: PaginationInfoProps) => (
  <div>
    <p className="text-sm text-gray-700">
      Showing <span className="font-medium">{startItem}</span> to{' '}
      <span className="font-medium">{endItem}</span> of{' '}
      <span className="font-medium">{totalItems}</span> results
    </p>
  </div>
) 