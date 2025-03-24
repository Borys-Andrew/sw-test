import React from "react";

import { Company } from "@/types";

interface Props {
  company: Company;
}

const CompanyInfo: React.FC<Props> = ({ company }) => {
  return (
    <div className="w-full h-full p-4 space-y-2 text-sm overflow-auto">
      <h2 className="text-xl font-bold">Company info</h2>
      <p>
        <strong>Name:</strong> {company.name}
      </p>
      <p>
        <strong>Legal name:</strong> {company.legal_name}
      </p>
      <p>
        <strong>Stock exchange:</strong> {company.stock_exchange}
      </p>
      <p>
        <strong>CEO:</strong> {company.ceo}
      </p>
      <p>
        <strong>Short description:</strong> {company.short_description}
      </p>
      <p>
        <strong>Long description:</strong> {company.long_description}
      </p>

      <h3 className="font-semibold mt-3">Contact Info</h3>
      <p>
        <strong>Business address:</strong> {company.business_address}
      </p>
      <p>
        <strong>Mailing address:</strong> {company.mailing_address}
      </p>
      <p>
        <strong>Phone:</strong> {company.business_phone_no}
      </p>

      <h3 className="font-semibold mt-3">Location</h3>
      <p>
        <strong>HQ:</strong> {company.hq_address1},{" "}
        {company.hq_address2 ? `${company.hq_address2}, ` : ""}
        {company.hq_address_city}, {company.hq_state}, {company.hq_country},{" "}
        {company.hq_address_postal_code}
      </p>
      <p>
        <strong>Incorporated in:</strong> {company.inc_state},{" "}
        {company.inc_country}
      </p>

      <h3 className="font-semibold mt-3">Company Info</h3>
      <p>
        <strong>Employees:</strong> {company.employees}
      </p>
      <p>
        <strong>Entity legal form:</strong> {company.entity_legal_form}
      </p>
      <p>
        <strong>Entity status:</strong> {company.entity_status}
      </p>
      <p>
        <strong>Sector:</strong> {company.sector}
      </p>
      <p>
        <strong>Industry category:</strong> {company.industry_category}
      </p>
      <p>
        <strong>Industry group:</strong> {company.industry_group}
      </p>

      <h3 className="font-semibold mt-3">Filing Info</h3>
      <p>
        <strong>Latest filing date:</strong> {company.latest_filing_date}
      </p>
      <p>
        <strong>First stock price date:</strong>{" "}
        {company.first_stock_price_date}
      </p>
      <p>
        <strong>Last stock price date:</strong> {company.last_stock_price_date}
      </p>

      <h3 className="font-semibold mt-3">Legacy & Other</h3>
      <p>
        <strong>Legacy sector:</strong> {company.legacy_sector}
      </p>
      <p>
        <strong>Legacy industry category:</strong>{" "}
        {company.legacy_industry_category}
      </p>
      <p>
        <strong>Legacy industry group:</strong> {company.legacy_industry_group}
      </p>
      <p>
        <strong>Thea enabled:</strong> {company.thea_enabled ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default CompanyInfo;
