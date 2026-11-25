import { useState } from 'react';
import { Vehicle } from './data/vehicles';
import { useVehicles } from './hooks/useVehicles';
import { formatCurrencyBRL } from './config/dealership';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Differentials } from './components/Differentials';
import { InventorySection } from './components/InventorySection';
import { HowToBuy } from './components/HowToBuy';
import { FinancingSection } from './components/FinancingSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { VehicleModal } from './components/VehicleModal';

export default function App() {
  const { vehicles, isLoading, isFallback, errorMessage, reload } =
    useVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [financingVehicleLabel, setFinancingVehicleLabel] = useState('');

  function handleSimulateFinancing(vehicle: Vehicle) {
    setFinancingVehicleLabel(
      `${vehicle.brand} ${vehicle.model} (${vehicle.year}) - ${formatCurrencyBRL(
        vehicle.price
      )}`
    );
    setSelectedVehicle(null);

    requestAnimationFrame(() => {
      const target = document.getElementById('financiamento');
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  return (
    <div className="min-h-screen bg-[#0D0D0F] text-white">
      <Header />

      <main>
        <Hero />
        <Differentials />
        <InventorySection
          vehicles={vehicles}
          isLoading={isLoading}
          isFallback={isFallback}
          errorMessage={errorMessage}
          onReload={reload}
          onSelectVehicle={setSelectedVehicle}
        />
        <HowToBuy />
        <FinancingSection
          vehicles={vehicles}
          preselectedVehicleLabel={financingVehicleLabel}
        />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />

      <VehicleModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        onSimulateFinancing={handleSimulateFinancing}
      />
    </div>
  );
}
