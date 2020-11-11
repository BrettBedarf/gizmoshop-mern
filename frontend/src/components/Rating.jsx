import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ rating, reviewCount }) => {
	return (
		<>
			<div className='rating'>
				<div
					className='rating-upper'
					style={{
						width: `${(rating / 5) * 100}%`,
					}}
				>
					<span>★</span>
					<span>★</span>
					<span>★</span>
					<span>★</span>
					<span>★</span>
				</div>
				<div className='rating-lower'>
					<span>★</span>
					<span>★</span>
					<span>★</span>
					<span>★</span>
					<span>★</span>
				</div>
			</div>
			<span className='review-count'>({reviewCount})</span>
		</>
	);
};

Rating.propTypes = {
	rating: PropTypes.number.isRequired,
};

Rating.defaultProps = {
	rating: 0,
};

export default Rating;
