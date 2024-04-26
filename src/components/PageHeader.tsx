type PageHeaderProps = {
  title: string;
  description?: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        {title}
      </h1>

      {description &&
        <p className="font-base text-sm text-gray-500">
          {description}
        </p>
      }
    </div>
  )
}

export default PageHeader